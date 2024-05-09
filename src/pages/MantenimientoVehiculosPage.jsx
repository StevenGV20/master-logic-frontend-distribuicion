import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, Pagination, Stack } from "@mui/material";

import { PAGE_MANTENIMIENTO_VEHICULOS } from "../utils/titles";
import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import TableCustom from "../components/widgets/TableComponent";
import {
  API_MAESTRO,
  MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_MOBILE,
} from "../utils/general";
import FormUnidadesTransporteComponent from "../components/FormVehiculoComponent";
import { deleteFetchFunction, getFetchFunction } from "../utils/funciones";
import AlertMessage from "../components/widgets/AlertMessage";
import PaginationCustom from "../components/widgets/PaginationComponent/PaginationCustom";

const MantenimientoVehiculosPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [vehiculoSelected, setVehiculoSelected] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openMessage, setOpenMessage] = useState({
    state: false,
    message: "",
    type: "success",
  });

  const handleNewdVehiculo = () => {
    setVehiculoSelected(null);
    setOpenModal(true);
  };
  const handleSelectedVehiculo = (vehiculo) => {
    setVehiculoSelected(vehiculo);
    setOpenModal(true);
  };

  const handleSelectedDeleteVehiculo = (vehiculo) => {
    setVehiculoSelected(vehiculo);
    setOpenModalDelete(true);
  };
  const onDeleteVehiculo = () => {
    //alert(JSON.stringify(vehiculoSelected));

    const fetchUnidadTransporte = async () => {
      try {
        await deleteFetchFunction(
          `${API_MAESTRO}/deleteMaestroUnidadesTransporteUTR?id=${vehiculoSelected.id}`,
          "{}",
          setOpenMessage
        );
        setRefreshTable((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
      //await getFetchFunction(`${API_MAESTRO}/listarMaestroChoferesCho`,setLoadingTable,setChoferes);
    };
    fetchUnidadTransporte();
    setOpenModalDelete(false);
  };

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        await getFetchFunction(
          `${API_MAESTRO}/listarMaestroUnidadesTransporteUTR`,
          setLoadingTable,
          setVehiculos
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehiculos();
  }, [refreshTable]);

  const [limit, setLimit] = useState(10);

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_MANTENIMIENTO_VEHICULOS} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => handleNewdVehiculo()}
          className="w-2/6 lg:w-2/12 bg-black text-white py-4"
        >
          Nuevo
        </button>
        <div className="w-1/6 lg:w-1/12 text-center content-center grid justify-items-center">
          <div className="w-5 ml-4">
            <button onClick={() => setOpenFilter(true)}>
              <FilterAltIcon />
            </button>
          </div>
          <FilterComponent
            open={openFilter}
            setOpen={setOpenFilter}
            title={"Filtrar Vehiculos"}
          ></FilterComponent>
        </div>
      </div>

      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={vehiculoSelected ? "Editar Vehiculo" : "Nuevo Vehiculo"}
        titleBtnAceptar={"Guardar"}
        onBtnAceptar={() => <></>}
        showButtons={false}
      >
        <FormUnidadesTransporteComponent
          vehiculoSelected={vehiculoSelected}
          setVehiculoSelected={setVehiculoSelected}
          setOpenModal={setOpenModal}
          setOpenMessage={setOpenMessage}
          setRefreshTable={setRefreshTable}
        />
      </ModalMessage>

      <ModalMessage
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        title={"Eliminar vehiculo"}
        titleBtnAceptar={"Eliminar"}
        onBtnAceptar={() => onDeleteVehiculo()}
        showButtons={true}
        isMessage={true}
      >
        <div className="w-full text-center text-lg p-0 font-semibold">
          ¿Estas seguro de eliminar?
        </div>
      </ModalMessage>

      <AlertMessage openMessage={openMessage} setOpenMessage={setOpenMessage} />

      <PaginationCustom data={vehiculos.result}>
        <div className="desktop">
          <TableCustom
            cols={MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_DESKTOP}
          >
            {!loadingTable ? (
              vehiculos &&
              vehiculos.result.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>
                    <div>{v.utr_codutr}</div>
                    <div>{v.utr_desutr}</div>
                    <div>{v.utr_plautr}</div>
                    <div>{v.utr_marutr}</div>
                  </td>
                  <td>
                    <div>{v.cho_nombre}</div>
                    <div>{v.utr_codusu}</div>
                  </td>
                  <td>
                    <div>{v.utr_conrep}</div>
                    <div>{v.utr_tercero}</div>
                    <div>{v.utr_prvruc}</div>
                    <div>{v.utr_prvrso}</div>
                  </td>
                  <td></td>
                  <td className="space-x-2">
                    <EditIcon
                      className="text-gray-700 cursor-pointer"
                      onClick={() => handleSelectedVehiculo(v)}
                    />
                    <DeleteIcon
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleSelectedDeleteVehiculo(v)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_DESKTOP.length
                  }
                >
                  <CircularProgress />
                </td>
              </tr>
            )}
          </TableCustom>
        </div>

        <div className="mobile">
          <TableCustom cols={MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_MOBILE}>
            {!loadingTable ? (
              vehiculos &&
              vehiculos.result.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div>{v.id}</div>
                    <div>{v.utr_codutr}</div>
                    <div>{v.utr_desutr}</div>
                    <div>{v.utr_plautr}</div>
                    <div>{v.utr_marutr}</div>
                    <div>{v.cho_codcho.length > 0 && v.cho_codcho}</div>
                    <div>{v.utr_codusu}</div>
                    <div>{v.utr_conrep}</div>
                    <div>{v.utr_tercero}</div>
                    <div>{v.utr_prvruc}</div>
                    <div>{v.utr_prvrso}</div>
                  </td>
                  <td className="space-y-4">
                    <EditIcon
                      className="text-gray-700 cursor-pointer mb-6"
                      onClick={() => handleSelectedVehiculo(v)}
                    />
                    <DeleteIcon
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleSelectedDeleteVehiculo(v)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_DESKTOP.length
                  }
                >
                  <CircularProgress />
                </td>
              </tr>
            )}
          </TableCustom>
        </div>
      </PaginationCustom>
    </div>
  );
};

export default MantenimientoVehiculosPage;
