import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import BreadcrumbComponent from "../components/widgets/BreadcrumbComponent";
import ModalMessage from "../components/widgets/ModalComponent";
//import Pagination from "../components/PaginationComponent";
import FilterComponent from "../components/widgets/FilterComponent";
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import { PAGE_AGRUPAR_OD } from "../utils/titles";
import {
  API_DISTRIBUCION,
  URL_MASTERLOGIC_API,
  USERNAME_LOCAL,
} from "../utils/general";
import FormCarritoAgrupacionODComponent from "../components/FormCarritoAgrupacionODComponent";
import { convertirDateTimeToDate, getFetchFunction, putFetchFunction } from "../utils/funciones";
import SlideOverComponent from "../components/widgets/SlideOverComponent";
import { objOrdenesDespachoEntity } from "../api/ordenesDespachoApi";
import FormFiltroODFromOsis from "../components/FormFIltroODFromOsis";
import AlertMessage from "../components/widgets/AlertMessage";
import PaginationCustom from "../components/widgets/PaginationComponent/PaginationCustom";

const AgruparODPage = () => {
  const [openModal, setOpenModal] = useState(false);

  registerLocale("es", es);
  setDefaultLocale("es");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openEndDate, setOpenEndDate] = useState(false);
  const [refreshTable, setRefreshTable] = useState(true);

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

  const [ordenesDespacho, setOrdenesDespacho] = useState(
    objOrdenesDespachoEntity
  );
  const [loadingTable, setLoadingTable] = useState(true);

  const userLocal = localStorage.getItem("USERNAME");

  useEffect(() => {
    findOrdenesDespacho(1, 10);
  }, [refreshTable]);

  const findOrdenesDespacho = (page, limit, fromFilter = true) => {
    const fetchOrdenesDespacho = async () => {
      try {
        await getFetchFunction(
          `${API_DISTRIBUCION}/listaOrdenDespachoFiltros?page=${page}&limit=${limit}&cia=01&dateStart=${convertirDateTimeToDate(
            filtrosOrdenesDespacho.fechaInicio
          )}&dateEnd=${convertirDateTimeToDate(
            filtrosOrdenesDespacho.fechaFinal
          )}&orderBy=${filtrosOrdenesDespacho.filtro1}`,
          setLoadingTable,
          setOrdenesDespacho
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenesDespacho();
  };

  const [filtrosOrdenesDespacho, setFiltrosOrdenesDespacho] = useState({
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    filtro1: "numodc",
    filtro2: "",
    filtro3: "",
    btnFechaSelected: "btnFechaToday",
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
    //alert(JSON.stringify(filtros, null, 2));
    findOrdenesDespacho(1, 10);

    /* setFiltrosOrdenesDespacho({
      fechaInicio: new Date(),
      fechaFinal: new Date(),
      filtro1: "numodc",
      filtro2: "",
      filtro3: "",
      btnFechaSelected: "btnFechaToday",
    }); */
  };

  const [carritoOrdenesDespacho, setCarritoOrdenesDespacho] = useState([]);
  const [openCarritoGrupos, setOpenCarritoGrupos] = useState(false);

  const updateCarritoOrdenesDespacho = (data) => {
    localStorage.setItem("ODSAGRUPAR", JSON.stringify(data));
    setCarritoOrdenesDespacho(data);
  };

  useEffect(() => {
    if (ordenesDespacho.result.length > 0) {
      let localODGroup = JSON.parse(localStorage.getItem("ODSAGRUPAR")) || [];
      let listODs = [...localODGroup];

      ordenesDespacho.result.map((o) => {
        if (o.odc_estado === "2" && o.odc_selusu === userLocal) {
          let isOd = listODs.find((od) => od.id === o.id);
          if (!isOd) listODs.push(o);
        }
      });

      updateCarritoOrdenesDespacho(listODs);
      localStorage.setItem("ODSAGRUPAR", JSON.stringify(listODs));
    }
  }, [ordenesDespacho]);

  const handleSelectRow = async (orden) => {
    const selectItemCarritoOD = (data) => {
      if (data.statusCode === 200) {
        const data_orden_selected = JSON.parse(data.mensaje);

        orden.odc_estado = data_orden_selected.odc_estado;
        orden.odc_selusu = data_orden_selected.odc_selusu;

        if (data_orden_selected.odc_estado === "2") {
          updateCarritoOrdenesDespacho([...carritoOrdenesDespacho, orden]);
        } else {
          const newLista = carritoOrdenesDespacho.filter(
            (o) => o.id !== orden.id
          );
          updateCarritoOrdenesDespacho(newLista);
        }
      } else {
        setOpenMessage({
          state: true,
          message: data.mensaje,
          type: data.status.toLowerCase(),
        });
      }
    };

    putFetchFunction(
      `${API_DISTRIBUCION}/selectOrdenDespachoToGroup?id=${orden.id}&usuario=${userLocal}`,
      {},
      selectItemCarritoOD
    );
  };

  const [openMessage, setOpenMessage] = useState(false);

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
        {/*filtro de busqueda */}
        <FilterComponent title={"Filtrar Ordenes de Despacho"}>
          <div>
            <input
              type="text"
              value={filtrosOrdenesDespacho.filtro1}
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
                selected={filtrosOrdenesDespacho.fechaInicio}
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
                selected={filtrosOrdenesDespacho.fechaFinal}
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
              <label
                htmlFor="checkboxOpcion1"
                className="filter-checkbox-label"
              >
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
              <label
                htmlFor="checkboxOpcion2"
                className="filter-checkbox-label"
              >
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
      </div>

      <AlertMessage openMessage={openMessage} setOpenMessage={setOpenMessage} />

      <PaginationCustom
        totalRows={
          ordenesDespacho.totalRows && ordenesDespacho.totalRows.totalrows
        }
        fetchData={findOrdenesDespacho}
        refreshTable={refreshTable}
        showLimit={true}
      >
        <ListOrdenesDespachoComponent
          ordenesDespacho={ordenesDespacho.result}
          setOrdenesDespacho={setOrdenesDespacho}
          showButtonDelete={true}
          showPagination={false}
          carritoOrdenesDespacho={carritoOrdenesDespacho}
          setCarritoOrdenesDespacho={updateCarritoOrdenesDespacho}
          titlePage={PAGE_AGRUPAR_OD}
          loadingTable={loadingTable}
          handleSelectRow={handleSelectRow}
          findOrdenesDespacho={findOrdenesDespacho}
          setOpenMessage={setOpenMessage}
          setRefreshTable={setRefreshTable}
        />
      </PaginationCustom>
      {/*importar desde OSIS/SAP */}
      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={"Importar Ordenes de Despacho"}
        titleBtnAceptar={"Importar OD"}
        showButtons={false}
      >
        <FormFiltroODFromOsis
          setOpen={setOpenModal}
          setOpenMessage={setOpenMessage}
          setRefreshTable={setRefreshTable}
        />
      </ModalMessage>

      {/*carrito de compras */}

      <div className="relative">
        <button
          onClick={() => setOpenCarritoGrupos(true)}
          className="z-50 fixed right-6 bottom-6 bg-gray-300 rounded-full py-6 px-6 scale-100 
                      sm:scale-110 hover:scale-125  hover:ring-gray-400 hover:ring-2 shadow-md shadow-gray-600"
        >
          <AppRegistrationIcon sx={{ fontSize: 25 }} />
        </button>
      </div>

      <SlideOverComponent
        open={openCarritoGrupos}
        setOpen={setOpenCarritoGrupos}
        title={"Ordenes de Despacho Selecionadas"}
        reSizeWidth={true}
      >
        <div className="table-container-tbody divide-y-2 divide-gray-400 md:p-4 text-left space-y-4 text-black">
          {carritoOrdenesDespacho.length > 0 ? (
            <>
              <FormCarritoAgrupacionODComponent
                carritoOrdenesDespacho={carritoOrdenesDespacho}
                handleSelectRow={handleSelectRow}
                setCarritoOrdenesDespacho={updateCarritoOrdenesDespacho}
                setOpenCarritoGrupos={setOpenCarritoGrupos}
                setRefreshTable={setRefreshTable}
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
      </SlideOverComponent>
    </div>
  );
};

export default AgruparODPage;
