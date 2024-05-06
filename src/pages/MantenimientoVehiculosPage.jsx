import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Checkbox, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { PAGE_MANTENIMIENTO_VEHICULOS } from "../utils/titles";
import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ModalMessage from "../components/widgets/ModalComponent";
import TableCustom from "../components/widgets/TableComponent";
import {
  MANTENIMIENTO_VEHICULOS_TABLE_COLS_DESKTOP,
  URL_MASTERLOGIC_API,
} from "../utils/general";
import FormVehiculoComponent from "../components/FormVehiculoComponent";

const MantenimientoVehiculosPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [vehiculoSelected, setVehiculoSelected] = useState(null);

  const handleNewdVehiculo = (vehiculo) => {
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
    alert(JSON.stringify(vehiculoSelected));
  };

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch(`${URL_MASTERLOGIC_API}/db.json`);
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        setVehiculos(data.vehiculos);
        setLoadingTable(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehiculos();
  }, []);

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
        <FormVehiculoComponent
          vehiculoSelected={vehiculoSelected}
          setVehiculoSelected={setVehiculoSelected}
          setOpenModal={setOpenModal}
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
        <div className="w-full text-center text-lg p-0 font-semibold">¿Estas seguro de eliminar?</div>
      </ModalMessage>

      <div>
        <TableCustom cols={MANTENIMIENTO_VEHICULOS_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            vehiculos &&
            vehiculos.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.vehiculo}</td>
                <td>{v.chofer}</td>
                <td>{v.licencia}</td>
                <td>{v.estado}</td>
                <td>{v.propietario}</td>
                <td>{v.sede}</td>
                <td>{v.volumenMaximo}</td>
                <td>{v.tipoVolumen}</td>
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
              <td colSpan={MANTENIMIENTO_VEHICULOS_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>
    </div>
  );
};

export default MantenimientoVehiculosPage;
