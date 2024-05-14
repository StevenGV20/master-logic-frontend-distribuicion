import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import {
  convertirDateTimeToDate,
  getFetchFunction,
  postFetchFunction,
} from "../../utils/funciones";
import { API_DISTRIBUCION } from "../../utils/general";
import ListODOsisComponent from "../ListODOsisComponent/TableCheckbox";

const FormFiltroODFromOsis = ({ setOpen, setOpenMessage, setRefreshTable }) => {
  registerLocale("es", es);
  setDefaultLocale("es");

  const [ordenesDespachoOsis, setOrdenesDespachoOsis] = useState([]);
  const [filtrosOsis, setFiltrosOsis] = useState({
    canal: "",
    cliente: "",
    numeroPedido: "",
    emisionPedido: new Date(),
    numeroOrden: "",
    emisionOrden: new Date(),
  });
  const [loadingTableOsis, setLoadingTableOsis] = useState(true);
  const [ordenesDespachoSelected, setOrdenesDespachoSelected] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const onSearchOsis = () => {
    if (
      !filtrosOsis.canal &&
      !filtrosOsis.cliente &&
      !filtrosOsis.numeroPedido &&
      !filtrosOsis.emisionPedido &&
      !filtrosOsis.numeroOrden &&
      !filtrosOsis.emisionOrden
    ) {
      setErrorMessage("No has ingresado ningun filtro");
    } else {
      setErrorMessage("");
      setOrdenesDespachoOsis([]);
      setLoadingTableOsis(true);
      setOrdenesDespachoSelected([]);
      const fetchOrdenesDespachoOsis = async () => {
        try {
          await getFetchFunction(
            `${API_DISTRIBUCION}/listaOrdenDespachoFromOsis?fecppc=${convertirDateTimeToDate(
              filtrosOsis.emisionPedido
            )}&fecodc=${convertirDateTimeToDate(
              filtrosOsis.emisionOrden
            )}&numODC=${filtrosOsis.numeroOrden}&numPPC=${
              filtrosOsis.numeroPedido
            }&cia=01`,
            setLoadingTableOsis,
            setOrdenesDespachoOsis
          );
        } catch (error) {
          console.error(error);
        }
      };
      fetchOrdenesDespachoOsis();
    }
  };

  const onImportarOD = () => {
    //alert(JSON.stringify(ordenesDespachoSelected, null, 2));

    const fetchODOsisToCloud = async () => {
      try {
        await postFetchFunction(
          `${API_DISTRIBUCION}/saveListOrdenesDespacho`,
          ordenesDespachoSelected,
          setOpenMessage
        );
        setOrdenesDespachoSelected([]);
        //setOrdenesDespachoOsis([]);
        setOpen(false);
        setRefreshTable(prev=> !prev)
      } catch (error) {
        console.error(error);
      }
    };
    fetchODOsisToCloud();
  };

  return (
    <>
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
            <input
              type="text"
              className="modal-group-input-md"
              value={filtrosOsis.numeroOrden}
              onChange={(e) =>
                setFiltrosOsis({
                  ...filtrosOsis,
                  numeroOrden: e.target.value,
                })
              }
            />
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
        <div className="w-full flex justify-center">
          <span className="form-container-group-content-span-error mt-4 -mb-4">
            {errorMessage}
          </span>
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
      <ListODOsisComponent
        data={ordenesDespachoOsis.result}
        loadingTableOsis={loadingTableOsis}
        selected={ordenesDespachoSelected}
        setSelected={setOrdenesDespachoSelected}
      />
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => onImportarOD()}
        >
          Importar Ordenes de Despacho
        </button>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </button>
      </div>
    </>
  );
};

export default FormFiltroODFromOsis;
