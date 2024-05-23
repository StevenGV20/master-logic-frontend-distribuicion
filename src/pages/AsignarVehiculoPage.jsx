import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";

import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import { PAGE_ASIGNAR_VEHICULO } from "../utils/titles";
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import { CircularProgress } from "@mui/material";
import {
  API_DISTRIBUCION,
  API_MAESTRO,
  GRUPOS_COLS_DESKTOP,
  GRUPOS_COLS_MOBILE,
  GRUPOS_COLS_MODAL_DESKTOP,
  GRUPOS_COLS_MODAL_MOBILE,
  URL_MASTERLOGIC_API,
  VEHICULOS_DISPONIBILIDAD_COLS_DESKTOP,
  VEHICULOS_DISPONIBILIDAD_COLS_MOBILE,
} from "../utils/general";
import {
  calcularMontoTotal,
  calcularVolumenAsignadoTotal,
  calcularVolumenTotal,
  getFetchFunction,
} from "../utils/funciones";
import TableCustom from "../components/widgets/TableComponent";
import TableCollapseMUICustomComponent from "../components/widgets/TableComponent/TableCollapseMUICustomComponent";
import TableMUICustomComponent from "../components/widgets/TableComponent/TableMUICustomComponent";
import FormAsignarVehiculoComponent from "../components/FormAsignarVehiculoComponent";
import PaginationCustom from "../components/widgets/PaginationComponent/PaginationCustom";

function Row(props) {
  const { row, isMobile, vehiculos } = props;
  const [grupoToAsign, setGrupoToAsign] = useState(null);

  const handleAsignGroup = (group) => {
    setGrupoToAsign(group);
    setOpenModal(true);
  };

  const [openModal, setOpenModal] = useState(false);
  const onAsignarVehiculo = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <TableCollapseMUICustomComponent
        titleSubTable={"Ordenes de Despacho"}
        subtable={
          <ListOrdenesDespachoComponent
            ordenesDespacho={row.ordenDespachos}
            setOrdenesDespacho={() => <></>}
            showButtonDelete={false}
            showPagination={false}
            titlePage=""
            loadingTable={false}
          />
        }
        colSpanSubTable={GRUPOS_COLS_DESKTOP.length}
      >
        {isMobile ? (
          <>
            <TableCell colSpan={2}>
              <div>{row.gru_grucod}</div>
              <div>{row.sed_sedcod}</div>
              <div>
                <div>Volumen total (m3):</div>
                {row.gru_volumen}
              </div>
              <div>
                <div>Monto total:</div>
                {row.gru_monto}
              </div>
              <div>
                <div>Ubigeo:</div>
                {row.gru_des_ubigeo}
              </div>
            </TableCell>
            <TableCell colSpan={1}>
              {row.idviaje > 0 ? (
                <div className="flex space-x-2 justify-center w-full">
                  <div>{row.vehiculo}</div>
                  <button className="z-50">
                    <DeleteIcon className="text-red-600" />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="bg-black text-white p-1 sm:py-2 sm:px-4 rounded-md"
                    onClick={() => handleAsignGroup(row)}
                  >
                    Asignar Vehiculo
                  </button>
                </div>
              )}
            </TableCell>
          </>
        ) : (
          <>
            <TableCell component="th" scope="row">
              {row.gru_grucod}
            </TableCell>
            <TableCell align="center">{row.sed_sedcod}</TableCell>
            <TableCell align="center">{row.gru_volumen}</TableCell>
            <TableCell align="center">{row.gru_bultos}</TableCell>
            <TableCell align="center">{row.gru_peso}</TableCell>
            <TableCell align="center">{row.gru_nroode}</TableCell>
            <TableCell align="center">{row.gru_monto}</TableCell>
            <TableCell align="center">{row.gru_des_ubigeo}</TableCell>
            <TableCell align="center">
              {row.idviaje > 0 ? (
                <div className="flex space-x-2 justify-center w-full">
                  <div>{row.vehiculo}</div>
                  <button className="z-50">
                    <DeleteIcon className="text-red-600" />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="bg-black text-white py-2 px-4 rounded-md"
                    onClick={() => handleAsignGroup(row)}
                  >
                    Asignar Vehiculo
                  </button>
                </div>
              )}
            </TableCell>
            <TableCell align="center">{row.ruta}</TableCell>
            <TableCell align="center">{}</TableCell>
          </>
        )}
      </TableCollapseMUICustomComponent>

      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={"Asignar Vehiculo"}
        titleBtnAceptar={"Asignar"}
        onBtnAceptar={onAsignarVehiculo}
        showButtons={false}
      >
        <FormAsignarVehiculoComponent
          vehiculos={vehiculos.result}
          grupoToAsign={grupoToAsign}
          setOpenModal={setOpenModal}
        />
      </ModalMessage>
    </React.Fragment>
  );
}

//const rows = listGroupsFake.result;

const AsignarVehiculoPage = () => {
  const [grupos, setGrupos] = useState([]);

  const [loadingTable, setLoadingTable] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);

  const fetchGrupos = async (page, limit) => {
    try {
      getFetchFunction(
        `${API_DISTRIBUCION}/grupo/lista?limit=${limit}&page=${page}&cia=01&dateStart=2024-05-21&dateEnd=2024-05-28`,
        setLoadingTable,
        setGrupos
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGrupos(1, 10);
  }, [refreshTable]);

  const [vehiculos, setVehiculos] = useState([]);
  const [loadingTableVehiculos, setLoadingTableVehiculos] = useState(true);

  useEffect(() => {
    const setDataVehiculos = (data) => {
      let arrayVeh = data.result.filter(v=>v.cho_codcho != '');
      setVehiculos({result:arrayVeh});
    }

    getFetchFunction(
      `${API_MAESTRO}/listarMaestroUnidadesTransporteUTR?empresa=01`,
      setLoadingTableVehiculos,
      setDataVehiculos
    );
  }, [refreshTable]);

  const [openModalVehiculos, setOpenModalVehiculos] = useState(false);

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_ASIGNAR_VEHICULO} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => setOpenModalVehiculos(true)}
          className="w-2/6 lg:w-2/12 bg-black text-white py-4 px-2"
        >
          Ver Disponibilidad de Vehiculos
        </button>
      </div>
      <ModalMessage
        open={openModalVehiculos}
        setOpen={setOpenModalVehiculos}
        title={"Disponibilidad de Vehiculos"}
        titleBtnAceptar={"Aceptar"}
        onBtnAceptar={() => setOpenModalVehiculos(false)}
      >
        <div className="desktop text-black">
          <TableCustom cols={VEHICULOS_DISPONIBILIDAD_COLS_DESKTOP}>
            {!loadingTableVehiculos &&
              vehiculos.result.map((vehiculo) => {
                const totalVolumenAsignado = vehiculo.gruposAsignados
                  ? calcularVolumenAsignadoTotal(vehiculo.gruposAsignados)
                  : 0;
                //["GRUPO", "SEDE", "VOLUMEN TOTAL", "MONTO TOTAL"]
                return (
                  <>
                    <TableCollapseMUICustomComponent
                      titleSubTable={
                        vehiculo.gruposAsignados &&
                        vehiculo.gruposAsignados.length > 0
                          ? "Grupos Asignados"
                          : "No tienen ningún grupo asignado"
                      }
                      subtable={
                        vehiculo.gruposAsignados &&
                        vehiculo.gruposAsignados.length > 0 && (
                          <TableMUICustomComponent
                            cols={GRUPOS_COLS_MODAL_DESKTOP}
                          >
                            {vehiculo.gruposAsignados.map((grupo) => (
                              <>
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    {grupo.name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {grupo.sede}
                                  </TableCell>
                                  <TableCell align="center">
                                    {grupo.volumenTotal}
                                  </TableCell>
                                  <TableCell align="center">
                                    {grupo.montoTotal}
                                  </TableCell>
                                </TableRow>
                              </>
                            ))}
                          </TableMUICustomComponent>
                        )
                      }
                    >
                      <>
                        <TableCell
                          component="th"
                          scope="row"
                          className="hidden"
                        >
                          {vehiculo.vehiculo}
                        </TableCell>
                        <TableCell align="center">{vehiculo.chofer}</TableCell>
                        <TableCell align="center">{vehiculo.sede}</TableCell>
                        <TableCell align="center">
                          {vehiculo.volumenMaximo}
                        </TableCell>
                        <TableCell align="center">
                          {totalVolumenAsignado}
                        </TableCell>
                        <TableCell align="center">
                          {vehiculo.volumenMaximo - totalVolumenAsignado}
                        </TableCell>
                      </>
                    </TableCollapseMUICustomComponent>
                  </>
                );
              })}
          </TableCustom>
        </div>
        <div className="mobile text-black">
          <TableCustom cols={VEHICULOS_DISPONIBILIDAD_COLS_MOBILE}>
            {!loadingTableVehiculos &&
              vehiculos.result.map((vehiculo) => {
                const totalVolumenAsignado = vehiculo.gruposAsignados
                  ? calcularVolumenAsignadoTotal(vehiculo.gruposAsignados)
                  : 0;
                //["GRUPO", "SEDE", "VOLUMEN TOTAL", "MONTO TOTAL"]
                return (
                  <>
                    <TableCollapseMUICustomComponent
                      titleSubTable={
                        vehiculo.gruposAsignados &&
                        vehiculo.gruposAsignados.length > 0
                          ? "Grupos Asignados"
                          : "No tienen ningún grupo asignado"
                      }
                      subtable={
                        vehiculo.gruposAsignados &&
                        vehiculo.gruposAsignados.length > 0 && (
                          <TableMUICustomComponent
                            cols={GRUPOS_COLS_MODAL_MOBILE}
                          >
                            {vehiculo.gruposAsignados.map((grupo) => (
                              <>
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    <div>{grupo.name}</div>
                                    <div>{grupo.sede}</div>
                                    <div>{grupo.volumenTotal}</div>
                                    <div>{grupo.montoTotal}</div>
                                  </TableCell>
                                </TableRow>
                              </>
                            ))}
                          </TableMUICustomComponent>
                        )
                      }
                    >
                      <>
                        <TableCell component="th" scope="row">
                          <div className="block">
                            <div className="grid grid-cols-1">
                              <label htmlFor="">Vehiculo: </label>
                              <span>{vehiculo.vehiculo}</span>
                            </div>
                            <div className="grid grid-cols-1">
                              <label htmlFor="">Chofer: </label>
                              <span>{vehiculo.chofer}</span>
                            </div>
                            <div className="grid grid-cols-1">
                              <label htmlFor="">Sede: </label>
                              <span>{vehiculo.sede}</span>
                            </div>
                            <div className="grid grid-cols-1">
                              <label htmlFor="">Volumen Maximo:</label>
                              <span>{vehiculo.volumenMaximo}</span>
                            </div>
                            <div className="grid grid-cols-1">
                              <label htmlFor="">Volumen Asignado:</label>
                              <span>{totalVolumenAsignado}</span>
                            </div>
                            <div className="grid grid-cols-1">
                              <label htmlFor="">Volumen Disponible: </label>
                              <span>
                                {vehiculo.volumenMaximo - totalVolumenAsignado}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                      </>
                    </TableCollapseMUICustomComponent>
                  </>
                );
              })}
          </TableCustom>
        </div>
      </ModalMessage>

      <div className="desktop p-2 md:p-4">
        <PaginationCustom
          totalRows={grupos.totalRows}
          fetchData={fetchGrupos}
          refreshTable={refreshTable}
          showLimit={false}
        >
          <TableMUICustomComponent cols={GRUPOS_COLS_DESKTOP}>
            {!loadingTable ? (
              grupos.result.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  isMobile={false}
                  loadingTable={loadingTable}
                  vehiculos={vehiculos}
                  setVehiculos={setVehiculos}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={GRUPOS_COLS_DESKTOP.length}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableMUICustomComponent>
        </PaginationCustom>
      </div>

      <div className="mobile">
        <TableMUICustomComponent cols={GRUPOS_COLS_MOBILE}>
          {!loadingTable ? (
            grupos.result.map((row) => (
              <Row
                key={row.item}
                row={row}
                isMobile={true}
                loadingTable={loadingTable}
                vehiculos={vehiculos}
                setVehiculos={setVehiculos}
              />
            ))
          ) : (
            <td colSpan={GRUPOS_COLS_MOBILE.length}>
              <CircularProgress />
            </td>
          )}
        </TableMUICustomComponent>
      </div>
    </div>
  );
};

export default AsignarVehiculoPage;
