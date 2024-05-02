import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";

import BreadcrumbComponent from "../components/BreadcrumbComponent";
import ModalMessage from "../components/ModalComponent";
//import Pagination from "../components/PaginationComponent";
import FilterComponent from "../components/FilterComponent";
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import { PAGE_AGRUPAR_OD } from "../utils/titles";
import { URL_MASTERLOGIC_API } from "../utils/general";
import { Checkbox } from "@mui/material";
import ListODOsisComponent from "../components/ListODOsisComponent/TableCheckbox";
import {
  calcularBultosTotal,
  calcularMontoTotal,
  calcularPesoTotal,
  calcularVolumenTotal,
} from "../utils/funciones";

const AgruparODPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const onImportarOD = () => {
    setOpenModal(false);
    setOrdenesDespachoOsis([]);
  };

  registerLocale("es", es);
  setDefaultLocale("es");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openEndDate, setOpenEndDate] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
    setOpenEndDate(true);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setOpenEndDate(false);
  };

  const cols_desktop = [
    "Item",
    "Pedido",
    "Ord. Despacho",
    "Canal",
    "Cliente",
    "Carga",
    "GRUPO",
    "",
  ];
  const [ordenesDespacho, setOrdenesDespacho] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const fetchOrdenesDespacho = async () => {
      try {
        const response = await fetch(
          `${URL_MASTERLOGIC_API}/ordenesDespacho_small.json`
        );
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        console.log(data);
        setOrdenesDespacho(data);
        setLoadingTable(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenesDespacho();
    return () => {
      /* const listOD = await fetchOrdenesDespacho();
      console.log(listOD.result); */
    };
  }, []);

  const [carritoOrdenesDespacho, setCarritoOrdenesDespacho] = useState([]);
  const [openCarritoGrupos, setOpenCarritoGrupos] = useState(false);

  const handleSelectRow = async (orden) => {
    const od = carritoOrdenesDespacho.find((o) => o.item === orden.item);
    if (!od) {
      setCarritoOrdenesDespacho([...carritoOrdenesDespacho, orden]);
    } else {
      const newLista = carritoOrdenesDespacho.filter(
        (o) => o.item != orden.item
      );
      setCarritoOrdenesDespacho(newLista);
    }
  };

  const onDeleteODFromCarrito = (orden) => {
    console.log(orden);
    const newLista = carritoOrdenesDespacho.filter((o) => o.item != orden.item);
    setCarritoOrdenesDespacho(newLista);
  };

  const [ordenesDespachoOsis, setOrdenesDespachoOsis] = useState([]);
  const [filtrosOsis, setFiltrosOsis] = useState({
    canal: "",
    cliente: "",
    numeroPedido: "",
    emisionPedido: "",
    numeroOrden: "",
    emisionOrden: "",
  });

  const cols_od_osis = [
    "ID",
    "PEDIDO",
    "ORDEN DESPACHO",
    "CANAL",
    "CLIENTE",
    <div>
      <Checkbox size="medium" />
    </div>,
  ];
  const onSearchOsis = () => {
    const fetchOrdenesDespachoOsis = async (filtros) => {
      try {
        const response = await fetch(`${URL_MASTERLOGIC_API}/db.json`);
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        console.log(data);
        setOrdenesDespachoOsis(data.ordenesDespachoOsis);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenesDespachoOsis();
  };

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_AGRUPAR_OD} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => setOpenModal(true)}
          className="w-2/6 lg:w-2/12 bg-black text-white py-4"
        >
          Importar OD
        </button>
        <div className="w-1/6 lg:w-1/12 text-center content-center grid justify-items-center">
          <div className="w-5 ml-4">
            <button onClick={() => setOpenFilter(true)}>
              <FilterAltIcon />
            </button>
          </div>
        </div>
      </div>
      <ListOrdenesDespachoComponent
        ordenesDespacho={ordenesDespacho.result}
        setOrdenesDespacho={setOrdenesDespacho}
        showButtonDelete={true}
        showPagination={true}
        carritoOrdenesDespacho={carritoOrdenesDespacho}
        setCarritoOrdenesDespacho={setCarritoOrdenesDespacho}
        titlePage={PAGE_AGRUPAR_OD}
        loadingTable={loadingTable}
        handleSelectRow={handleSelectRow}
      />

      <div className="relative">
        <button
          onClick={() => setOpenCarritoGrupos(true)}
          className="z-50 fixed right-6 bottom-6 bg-gray-300 rounded-full py-6 px-6 scale-100 sm:scale-110  hover:ring-gray-400 hover:ring-2 shadow-md shadow-gray-600"
        >
          <AppRegistrationIcon sx={{ fontSize: 25 }} />
        </button>
      </div>

      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={"Importar Ordenes de Despacho"}
        titleBtnAceptar={"Importar OD"}
        onBtnAceptar={onImportarOD}
      >
        <div className="modal-group-container text-black">
          <div className="modal-group-item-container">
            <label htmlFor="">Canal:</label>
            <input
              type="text"
              className="modal-group-input-md"
              value={filtrosOsis.canal}
              onChange={(e) =>
                setFiltrosOsis({ ...filtrosOsis, canal: e.target.value })
              }
            />
          </div>
          <div className="modal-group-control-container w-full">
            <div className="modal-group-item-container grid-cols-4 w-full">
              <label htmlFor="" className="col-span-1">
                Cliente:
              </label>
              <input
                type="text"
                className="col-span-3 modal-group-input-md"
                value={filtrosOsis.cliente}
                onChange={(e) =>
                  setFiltrosOsis({ ...filtrosOsis, cliente: e.target.value })
                }
              />
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">N° Pedido:</label>
              <input
                type="text"
                className="modal-group-input-md"
                value={filtrosOsis.numeroPedido}
                onChange={(e) =>
                  setFiltrosOsis({
                    ...filtrosOsis,
                    numeroPedido: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Emision Pedido:</label>
              <DatePicker
                selected={filtrosOsis.emisionPedido}
                onChange={(date) =>
                  setFiltrosOsis({ ...filtrosOsis, emisionPedido: date })
                }
                selectsStart
                locale="es"
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-end"
                className="modal-group-input-md"
              />
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">N° Orden:</label>
              <input type="text" className="modal-group-input-md" />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Emision Orden:</label>
              <DatePicker
                selected={filtrosOsis.emisionOrden}
                onChange={(date) =>
                  setFiltrosOsis({ ...filtrosOsis, emisionOrden: date })
                }
                selectsStart
                locale="es"
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-end"
                className="modal-group-input-md"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="bg-black w-full md:w-1/2 lg:w-1/3 py-2 text-white my-4 rounded-md"
              onClick={() => onSearchOsis()}
            >
              Buscar
            </button>
          </div>
        </div>
        <ListODOsisComponent data={ordenesDespachoOsis} />
      </ModalMessage>

      <FilterComponent
        open={openFilter}
        setOpen={setOpenFilter}
        title={"Filtros"}
      >
        <div>
          <input
            type="text"
            className="modal-group-input w-full rounded-md border-blue-800 focus:border-blue-700 focus:shadow-md focus:shadow-blue-400"
          />
        </div>

        <div className="filter-group-container">
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxToday" />
            <label htmlFor="checkboxToday" className="filter-checkbox-label">
              Hoy
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxYesterday" />
            <label
              htmlFor="checkboxYesterday"
              className="filter-checkbox-label"
            >
              Ayer
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxSevenDays" />
            <label
              htmlFor="checkboxSevenDays"
              className="filter-checkbox-label"
            >
              Hace 7 dias
            </label>
          </div>
        </div>

        <div className="filter-group-container">
          <div className="w-1/2">
            <label>Fecha de inicio: </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale="es"
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom-end"
              className="z-10 px-4 py-2 border-2 w-full rounded-l-md modal-group-input-md"
            />
          </div>
          <div className="w-1/2">
            <label>Fecha de fin: </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale="es"
              open={openEndDate}
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom-start"
              className="px-4 py-2 border-2 w-full rounded-r-md modal-group-input-md"
            />
          </div>
        </div>

        <div className="filter-group-container">
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxOpcion1" />
            <label htmlFor="checkboxOpcion1" className="filter-checkbox-label">
              Opción 1
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxOpcion2" />
            <label htmlFor="checkboxOpcion2" className="filter-checkbox-label">
              Opción 2
            </label>
          </div>
        </div>

        <button className="bg-black w-full py-2 text-white my-4 rounded-md">
          Buscar
        </button>
      </FilterComponent>

      <FilterComponent
        open={openCarritoGrupos}
        setOpen={setOpenCarritoGrupos}
        title={"Ordenes de Despacho Selecionadas"}
      >
        <div className="table-container-tbody divide-y-2 divide-gray-400 md:p-4 text-left space-y-4 text-black">
          {carritoOrdenesDespacho.length > 0 ? (
            <>
              {carritoOrdenesDespacho.map((orden, index) => (
                <div className="grid grid-cols-12" key={index}>
                  <div className="col-span-1 content-center">{index + 1}</div>
                  <div className="td-group-mobile p-2 text-sm col-span-10">
                    <div>
                      <label>Pedido:</label>
                      <div className="flex space-x-4">
                        <div>{orden.numeroPedido}</div>
                        <div>{orden.emisionPedido}</div>
                      </div>
                    </div>
                    <div>
                      <label>Orden de Despacho:</label>
                      <div className="flex space-x-4">
                        <div>{orden.numeroOrdenDespacho}</div>
                        <div>{orden.emisionOrdenDespacho}</div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Canal:</label> {orden.canal}
                    </div>
                    <div>
                      <label>Cliente:</label>
                      <div>{orden.cliente}</div>
                      <div>{orden.direccionEntrega}</div>
                      <div>{orden.ubigeo}</div>
                    </div>
                    <div className="block space-x-3">
                      <label>Carga:</label>
                      <div className="grid grid-cols-2">
                        <div>{orden.volumen}</div>
                        <div>{orden.bultos} bultos</div>
                        <div>{orden.peso}</div>
                        <div>S/. {orden.monto && orden.monto.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 content-center">
                    <button
                      onClick={() => {
                        handleSelectRow(orden);
                      }}
                    >
                      <DeleteIcon className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4 py-4 grid grid-cols-2 space-y-1">
                <label htmlFor="">SEDE</label>
                <input type="text" value={"ATE"} className="" readOnly />
                <label htmlFor="">ENTREGA</label>
                <input type="text" value={"19/04/2024"} className="" readOnly />
                <label htmlFor="">Observación</label>
                <textarea className="" defaultValue={"ABC"} />
                <label htmlFor="">Vol. m3</label>
                <input
                  type="text"
                  value={calcularVolumenTotal(carritoOrdenesDespacho)}
                  className=""
                  readOnly
                />
                <label htmlFor="">Bultos</label>
                <input
                  type="text"
                  value={calcularBultosTotal(carritoOrdenesDespacho)}
                  className=""
                  readOnly
                />
                <label htmlFor="">Peso</label>
                <input
                  type="text"
                  value={calcularPesoTotal(carritoOrdenesDespacho)}
                  className=""
                  readOnly
                />
                <label htmlFor="">Monto</label>
                <input
                  type="text"
                  value={calcularMontoTotal(carritoOrdenesDespacho)}
                  className=""
                  readOnly
                />
                <label htmlFor="">N° ODs</label>
                <input
                  type="text"
                  value={carritoOrdenesDespacho.length}
                  className=""
                  readOnly
                />
                <div className="col-span-2">
                  <button className="w-full mt-4 bg-black py-2 text-white">
                    AGRUPAR OD
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                No has seleccionado ninguna Orden de Despacho.
              </div>
            </>
          )}
        </div>
      </FilterComponent>
    </div>
  );
};

export default AgruparODPage;
