import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";

import { PAGE_MANTENIMIENTO_DISTANCIAS } from "../utils/titles";
import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import TableCustom from "../components/widgets/TableComponent";
import {
  MANTENIMIENTO_DISTANCIAS_TABLE_COLS_DESKTOP,
  URL_MASTERLOGIC_API,
} from "../utils/general";
import FormDistanciaComponent from "../components/FormDistanciaComponent";

const MantenimientoDistanciasPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [distancias, setDistancias] = useState([]);
  const [distanciaSelected, setDistanciaSelected] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleNewDistancia = () => {
    setDistanciaSelected(null);
    setOpenModal(true);
  };
  const handleSelectedDistancia = (distancia) => {
    setDistanciaSelected(distancia);
    setOpenModal(true);
  };

  const handleSelectedDeleteDistrito = (distancia) => {
    setDistanciaSelected(distancia);
    setOpenModalDelete(true);
  };
  const onDeleteDistancia = () => {
    alert(JSON.stringify(distanciaSelected));
    setOpenModalDelete(false);
  };

  useEffect(() => {
    const fetchDistancias = async () => {
      try {
        const response = await fetch(`${URL_MASTERLOGIC_API}/db.json`);
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        setLoadingTable(false);
        setDistancias(data.distanciaDistritos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistancias();
  }, []);

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_MANTENIMIENTO_DISTANCIAS} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => handleNewDistancia()}
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
            title={"Filtrar Distancias"}
          ></FilterComponent>
        </div>
      </div>
      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={distanciaSelected ? "Editar Distancia" : "Nueva Distancia"}
        titleBtnAceptar={"Guardar"}
        onBtnAceptar={() => <></>}
        showButtons={false}
      >
        <FormDistanciaComponent
          distanciaSelected={distanciaSelected}
          setDistanciaSelected={setDistanciaSelected}
          setOpenModal={setOpenModal}
        />
      </ModalMessage>

      <ModalMessage
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        title={"Eliminar distancia"}
        titleBtnAceptar={"Eliminar"}
        onBtnAceptar={() => onDeleteDistancia()}
        showButtons={true}
        isMessage={true}
      >
        <div className="w-full text-center text-lg p-0 font-semibold">
          ¿Estas seguro de eliminar?
        </div>
      </ModalMessage>

      <div>
        <TableCustom cols={MANTENIMIENTO_DISTANCIAS_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            distancias &&
            distancias.map((d) => (
              <tr key={d.id}>
                <td>{d.sede}</td>
                <td>{d.distrito}</td>
                <td>{d.kilometros}</td>
                <td className="space-x-2">
                  <EditIcon
                    className="text-gray-700 cursor-pointer"
                    onClick={() => handleSelectedDistancia(d)}
                  />
                  <DeleteIcon
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleSelectedDeleteDistrito(d)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={MANTENIMIENTO_DISTANCIAS_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>
    </div>
  );
};

export default MantenimientoDistanciasPage;
