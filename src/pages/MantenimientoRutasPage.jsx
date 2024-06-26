import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { PAGE_MANTENIMIENTO_RUTAS } from "../utils/titles";
import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import { API_DISTRIBUCION } from "../utils/general";
import FormRutasComponent from "../components/FormRutasComponent";
import { deleteFetchFunction, getFetchFunction } from "../utils/funciones";
import AlertMessage from "../components/widgets/AlertMessage";
import ListRutasComponent from "../components/ListRutasComponent";
import FormAgregarDistritosToRutaComponent from "../components/FormAgregarDistritosToRutaComponent";

const MantenimientoRutasPage = () => {
  const [openModal, setOpenModal] = useState(false);
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

  const [openModalAsignDistrito, setOpenModalAsignDistrito] = useState(false);
  const handleSelectedRutaToDistrito = (ruta) => {
    setRutaSelected(ruta);
    setOpenModalAsignDistrito(true);
  };

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
        <FilterComponent
          title={"Filtrar Rutas"}
        ></FilterComponent>
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

      <ModalMessage
        open={openModalAsignDistrito}
        setOpen={setOpenModalAsignDistrito}
        title={"Asignar Distritos"}
        titleBtnAceptar={"Guardar"}
        onBtnAceptar={<></>}
        showButtons={false}
      >
        <FormAgregarDistritosToRutaComponent
          ruta={rutaSelected}
          setOpenModal={setOpenModalAsignDistrito}
          setOpenMessage={setOpenMessage}
        />
      </ModalMessage>

      <AlertMessage openMessage={openMessage} setOpenMessage={setOpenMessage} />

      <ListRutasComponent
        loadingTable={loadingTable}
        rutas={rutas}
        handleSelectedRuta={handleSelectedRuta}
        handleSelectedDeleteRuta={handleSelectedDeleteRuta}
        handleSelectedRutaToDistrito={handleSelectedRutaToDistrito}
      />
    </div>
  );
};

export default MantenimientoRutasPage;
