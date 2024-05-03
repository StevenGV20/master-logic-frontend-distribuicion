import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { PAGE_MANTENIMIENTO_RUTAS } from "../utils/titles";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import FilterComponent from "../components/FilterComponent";
import ModalMessage from "../components/ModalComponent";
import TableCustom from "../components/TableComponent";
import {
  MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP,
  URL_MASTERLOGIC_API,
} from "../utils/general";
import { CircularProgress } from "@mui/material";
import FormRutasComponent from "../components/FormRutasComponent";

const MantenimientoRutasPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [rutas, setRutas] = useState([]);
  const [rutaSelected, setRutaSelected] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);

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
    alert(JSON.stringify(rutaSelected));
    setOpenModalDelete(false);
  };

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${URL_MASTERLOGIC_API}/db.json`);
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        console.log(data.rutas);
        setRutas(data.rutas);
        setLoadingTable(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRutas();
  }, []);

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
      <div>
        <TableCustom cols={MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            rutas &&
            rutas.map((ruta) => (
              <tr>
                <td>{ruta.codigo}</td>
                <td>{ruta.sede}</td>
                <td>{ruta.descripcion}</td>
                <td>{ruta.volumenMinimo}</td>
                <td>{ruta.volumenMaximo}</td>
                <td>{ruta.monto}</td>
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
