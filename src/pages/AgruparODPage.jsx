import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import BreadcrumbComponent from "../components/BreadcrumbComponent";
import ModalMessage from "../components/ModalComponent";
//import Pagination from "../components/PaginationComponent";
import FilterComponent from "../components/FilterComponent";
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import { PAGE_AGRUPAR_OD } from "../utils/titles";
import { URL_MASTERLOGIC_API } from "../utils/general";
import ListODOsisComponent from "../components/ListODOsisComponent/TableCheckbox";
import FormCarritoAgrupacionODComponent from "../components/FormCarritoAgrupacionODComponent";

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
    setFiltrosOrdenesDespacho({
      ...filtrosOrdenesDespacho,
      fechaInicio: date,
    });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setOpenEndDate(false);
    setFiltrosOrdenesDespacho({
      ...filtrosOrdenesDespacho,
      fechaFinal: date,
    });
  };

  const [ordenesDespacho, setOrdenesDespacho] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const fetchOrdenesDespacho = async () => {
      try {
        const response = await fetch(
          `${URL_MASTERLOGIC_API}/ordenesDespacho_small.json?limit=10&page=1`
        );
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        setOrdenesDespacho(data);
        setLoadingTable(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenesDespacho();
  }, []);

  const findOrdenesDespacho = (page,limit) => {
    const fetchOrdenesDespacho = async () => {
      try {
        const response = await fetch(
          `${URL_MASTERLOGIC_API}/ordenesDespacho_small.json?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        setOrdenesDespacho(data);
        setLoadingTable(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenesDespacho();
  };

  const [filtrosOrdenesDespacho, setFiltrosOrdenesDespacho] = useState({
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    filtro1: "",
    filtro2: "",
    filtro3: "",
    btnFechaSelected: "",
  });

  const handleChangeFechaButtonFiltro = (tipo) => {
    if (filtrosOrdenesDespacho.btnFechaSelected === tipo)
      setFiltrosOrdenesDespacho({
        ...filtrosOrdenesDespacho,
        btnFechaSelected: "",
      });
    else {
      let fecha = new Date();
      if (tipo === "btnFechaToday") {
        fecha = new Date();
      } else if (tipo === "btnFechaAyer") {
        const fecToday = new Date();
        fecha = new Date(fecToday.setDate(fecToday.getDate() - 1));
      } else if (tipo === "btnFechaSemana") {
        const fecToday = new Date();
        fecha = new Date(fecToday.setDate(fecToday.getDate() - 7));
      }
      setStartDate(fecha);
      setEndDate(fecha);
      setFiltrosOrdenesDespacho({
        ...filtrosOrdenesDespacho,
        btnFechaSelected: tipo,
        fechaInicio: fecha,
        fechaFinal: fecha,
      });
    }
  };

  const onSearchFiltroOD = () => {
    const filtros = filtrosOrdenesDespacho;
    delete filtros.btnFechaSelected;
    alert(JSON.stringify(filtros, null, 2));
    /* 
    setFiltrosOrdenesDespacho({
      fechaInicio: new Date(),
      fechaFinal: new Date(),
      filtro1: "",
      filtro2: "",
      filtro3: "",
      btnFechaSelected: "",
    }); */
  };

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

  const [ordenesDespachoOsis, setOrdenesDespachoOsis] = useState([]);
  const [filtrosOsis, setFiltrosOsis] = useState({
    canal: "",
    cliente: "",
    numeroPedido: "",
    emisionPedido: "",
    numeroOrden: "",
    emisionOrden: "",
  });

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
        findOrdenesDespacho={findOrdenesDespacho}
      />

      <div className="relative">
        <button
          onClick={() => setOpenCarritoGrupos(true)}
          className="z-50 fixed right-6 bottom-6 bg-gray-300 rounded-full py-6 px-6 scale-100 
                      sm:scale-110 hover:scale-125  hover:ring-gray-400 hover:ring-2 shadow-md shadow-gray-600"
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
            onChange={(e) =>
              setFiltrosOrdenesDespacho({
                ...filtrosOrdenesDespacho,
                filtro1: e.target.value,
              })
            }
          />
        </div>

        <div className="filter-group-container">
          <div className="filter-checkbox-container">
            <button
              className={`filter-checkbox-label ${
                filtrosOrdenesDespacho.btnFechaSelected === "btnFechaToday"
                  ? "bg-blue-800 text-white"
                  : ""
              }`}
              onClick={() => handleChangeFechaButtonFiltro("btnFechaToday")}
            >
              Hoy
            </button>
          </div>
          <div className="filter-checkbox-container">
            <button
              className={`filter-checkbox-label ${
                filtrosOrdenesDespacho.btnFechaSelected === "btnFechaAyer"
                  ? "bg-blue-800 text-white"
                  : ""
              }`}
              onClick={() => handleChangeFechaButtonFiltro("btnFechaAyer")}
            >
              Ayer
            </button>
          </div>
          <div className="filter-checkbox-container">
            <button
              className={`filter-checkbox-label ${
                filtrosOrdenesDespacho.btnFechaSelected === "btnFechaSemana"
                  ? "bg-blue-800 text-white"
                  : ""
              }`}
              onClick={() => handleChangeFechaButtonFiltro("btnFechaSemana")}
            >
              Hace 7 dias
            </button>
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
            <input
              type="checkbox"
              id="checkboxOpcion1"
              value={"opcion1"}
              onChange={(e) =>
                setFiltrosOrdenesDespacho({
                  ...filtrosOrdenesDespacho,
                  filtro2: e.target.checked ? e.target.value : "",
                })
              }
            />
            <label htmlFor="checkboxOpcion1" className="filter-checkbox-label">
              Opción 1
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input
              type="checkbox"
              id="checkboxOpcion2"
              value={"opcion2"}
              onChange={(e) =>
                setFiltrosOrdenesDespacho({
                  ...filtrosOrdenesDespacho,
                  filtro3: e.target.checked ? e.target.value : "",
                })
              }
            />
            <label htmlFor="checkboxOpcion2" className="filter-checkbox-label">
              Opción 2
            </label>
          </div>
        </div>

        <button
          className="bg-black w-full py-2 text-white my-4 rounded-md"
          onClick={() => onSearchFiltroOD()}
        >
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
              <FormCarritoAgrupacionODComponent
                carritoOrdenesDespacho={carritoOrdenesDespacho}
                handleSelectRow={handleSelectRow}
              />
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
