import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import {
  API_MAESTRO,
  MANTENIMIENTO_CHOFERES_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_CHOFERES_TABLE_COLS_MOBILE,
  URL_MASTERLOGIC_API,
} from "../utils/general";
import { PAGE_MANTENIMIENTO_CHOFERES } from "../utils/titles";
import { deleteFetchFunction, getFetchFunction } from "../utils/funciones";
import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import FormChoferesComponent from "../components/FormChoferesComponent";
import TableCustom from "../components/widgets/TableComponent";

const MantenimientoChoferesPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [choferes, setChoferes] = useState([]);
  const [choferSelected, setChoferSelected] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openMessage, setOpenMessage] = useState({
    state: false,
    message: "",
    type: "success",
  });

  const handleNewChofer = () => {
    setChoferSelected(null);
    setOpenModal(true);
  };
  const handleSelectedDistancia = (chofer) => {
    setChoferSelected(chofer);
    setOpenModal(true);
  };

  const handleSelectedDeleteDChofer = (chofer) => {
    setChoferSelected(chofer);
    setOpenModalDelete(true);
  };

  const onDeleteChofer = () => {
    const fetchDistancias = async () => {
      try {
        await deleteFetchFunction(
          `${API_MAESTRO}/deleteMaestroChoferesCho?id=${choferSelected.id}`,
          "{}",
          setOpenMessage
        );
        setRefreshTable((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
      //await getFetchFunction(`${API_MAESTRO}/listarMaestroChoferesCho`,setLoadingTable,setChoferes);
    };
    fetchDistancias();
    setOpenModalDelete(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  useEffect(() => {
    const fetchDistancias = async () => {
      try {
        await getFetchFunction(
          `${API_MAESTRO}/listarMaestroChoferesCho`,
          setLoadingTable,
          setChoferes
        );
      } catch (error) {
        console.error(error);
      }

      //await getFetchFunction(`${API_MAESTRO}/listarMaestroChoferesCho`,setLoadingTable,setChoferes);
    };
    fetchDistancias();
  }, [refreshTable]);

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_MANTENIMIENTO_CHOFERES} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => handleNewChofer()}
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
            title={"Filtrar Choferes"}
          ></FilterComponent>
        </div>
      </div>
      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={choferSelected ? "Editar Chofer" : "Nueva Chofer"}
        titleBtnAceptar={"Guardar"}
        onBtnAceptar={() => <></>}
        showButtons={false}
      >
        <FormChoferesComponent
          choferSelected={choferSelected}
          setChoferSelected={setChoferSelected}
          setOpenModal={setOpenModal}
          setRefreshTable={setRefreshTable}
          setOpenMessage={setOpenMessage}
        />
      </ModalMessage>

      <ModalMessage
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        title={"Eliminar Chofer"}
        titleBtnAceptar={"Eliminar"}
        onBtnAceptar={() => onDeleteChofer()}
        showButtons={true}
        isMessage={true}
      >
        <div className="w-full text-center text-lg p-0 font-semibold">
          ¿Estas seguro de eliminar?
        </div>
      </ModalMessage>

      <Snackbar
        open={openMessage.state}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={openMessage.type}
          variant="filled"
          sx={{ width: "100%", scale:"1.2", marginLeft: "1em" }}
        >
          {openMessage.message}
        </Alert>
      </Snackbar>

      <div className="desktop">
        <TableCustom cols={MANTENIMIENTO_CHOFERES_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            choferes &&
            choferes.result.map((d) => (
              <tr key={d.id}>
              <td>{d.cho_codcho}</td>
                <td>{d.cho_nombre}</td>
                <td>{d.cho_nrolic}</td>
                <td>{d.cho_codusu}</td>
                <td>{d.cho_codemp}</td>
                <td>{d.cho_nrodoc}</td>
                <td className="space-x-2">
                  <EditIcon
                    className="text-gray-700 cursor-pointer"
                    onClick={() => handleSelectedDistancia(d)}
                  />
                  <DeleteIcon
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleSelectedDeleteDChofer(d)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={MANTENIMIENTO_CHOFERES_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>

      <div className="mobile">
        <TableCustom cols={MANTENIMIENTO_CHOFERES_TABLE_COLS_MOBILE}>
          {!loadingTable ? (
            choferes &&
            choferes.result.map((d) => (
              <tr key={d.id}>
                <td>
                  <div>{d.cho_codcho}</div>
                  <div>{d.cho_nombre}</div>
                  <div>{d.cho_nrolic}</div>
                  <div>{d.cho_codemp}</div>
                  <div>{d.cho_nrodoc}</div>
                </td>
                <td className="space-x-2">
                  <EditIcon
                    className="text-gray-700 cursor-pointer"
                    onClick={() => handleSelectedDistancia(d)}
                  />
                  <DeleteIcon
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleSelectedDeleteDChofer(d)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={MANTENIMIENTO_CHOFERES_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>
    </div>
  );
};

export default MantenimientoChoferesPage;
