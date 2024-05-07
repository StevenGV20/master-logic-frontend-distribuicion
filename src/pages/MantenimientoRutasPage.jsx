import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";

import { PAGE_MANTENIMIENTO_RUTAS } from "../utils/titles";
import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import TableCustom from "../components/widgets/TableComponent";
import {
  API_DISTRIBUCION,
  MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP,
  URL_MASTERLOGIC_API,
} from "../utils/general";
import { CircularProgress } from "@mui/material";
import FormRutasComponent from "../components/FormRutasComponent";
import { deleteFetchFunction, getFetchFunction } from "../utils/funciones";
import AlertMessage from "../components/widgets/AlertMessage";
import { fetchData } from "../redux/features/combos/sedeSlice";

const MantenimientoRutasPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [rutas, setRutas] = useState([]);
  const [rutaSelected, setRutaSelected] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [refreshTable, setRefreshTable] = useState(false);
  const [openMessage, setOpenMessage] = useState({
    state: false,
    message: "",
    type: "success",
  });

  const handleNewRuta = () => {
    setRutaSelected(null);
    setOpenModal(true);
  };
  const handleSelectedRuta = (ruta) => {
    setRutaSelected(ruta);
    setOpenModal(true);
  };

  const handleSelectedDeleteRuta = (ruta) => {
    setRutaSelected(ruta);
    setOpenModalDelete(true);
  };

  const onDeleteRuta = () => {
    const deleteRuta = async () => {
      try {
        await deleteFetchFunction(
          `${API_DISTRIBUCION}/deleteRuta?id=${rutaSelected.id}`,
          "{}",
          setOpenMessage
        );
        setRefreshTable((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
      //await getFetchFunction(`${API_MAESTRO}/listarMaestroChoferesCho`,setLoadingTable,setChoferes);
    };
    deleteRuta();
    setOpenModalDelete(false);
  };

  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("sedesCombo", sedesCombo);
    if (!(sedesCombo.length > 0)) dispatch(fetchData());
  }, []);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        await getFetchFunction(
          `${API_DISTRIBUCION}/listaRutas`,
          setLoadingTable,
          setRutas
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchRutas();
  }, [refreshTable]);

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_MANTENIMIENTO_RUTAS} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => handleNewRuta()}
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
        title={rutaSelected ? "Editar Ruta" : "Nueva Ruta"}
        titleBtnAceptar={"Guardar"}
        onBtnAceptar={<></>}
        showButtons={false}
      >
        <FormRutasComponent
          rutaSelected={rutaSelected}
          setOpenModal={setOpenModal}
          setOpenMessage={setOpenMessage}
          setRefreshTable={setRefreshTable}
        />
      </ModalMessage>
      <ModalMessage
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        title={"Eliminar Ruta"}
        titleBtnAceptar={"Eliminar"}
        onBtnAceptar={() => onDeleteRuta()}
        showButtons={true}
        isMessage={true}
      >
        <div className="w-full text-center text-lg p-0 font-semibold">
          ¿Estas seguro de eliminar?
        </div>
      </ModalMessage>
      <AlertMessage openMessage={openMessage} setOpenMessage={setOpenMessage}/>
      <div>
        <TableCustom cols={MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            rutas &&
            rutas.result.map((ruta) => (
              <tr>
                <td>{ruta.rut_codigo}</td>
                <td>{sedesCombo.find(s=>s.sed_codsed === ruta.sed_codsed).sed_descor}</td>
                <td>{ruta.rut_descripcion}</td>
                <td>{ruta.rut_volmin}</td>
                <td>{ruta.rut_volmax}</td>
                <td>{ruta.rut_precio}</td>
                <td className="space-x-2">
                  <EditIcon
                    className="text-gray-700 cursor-pointer"
                    onClick={() => handleSelectedRuta(ruta)}
                  />
                  <DeleteIcon
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleSelectedDeleteRuta(ruta)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>
    </div>
  );
};

export default MantenimientoRutasPage;
