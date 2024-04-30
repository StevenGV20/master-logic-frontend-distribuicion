import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { PAGE_GENERAR_OT_Y_GRT } from "../utils/titles";
import { ordenesDespachoFake } from "../data/ordenesDespachoFake";
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import FilterComponent from "../components/FilterComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const GenerarOTyGRT = () => {
  registerLocale("es", es);
  setDefaultLocale("es");
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
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    return () => {
      setOrdenesDespacho(ordenesDespachoFake.result);
    };
  }, []);

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

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_GENERAR_OT_Y_GRT} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button className="w-2/6 lg:w-2/12 bg-black text-white py-4">
          Generar OT y GRT
        </button>
        <div className="w-1/6 lg:w-1/12 text-center content-center grid justify-items-center">
          <div className="w-5 ml-4">
            <button onClick={() => setOpenFilter(true)}>
              <FilterAltIcon />
            </button>
          </div>
        </div>
      </div>
      {/* <ListOrdenesDespachoComponent
        cols_desktop={cols_desktop}
        ordenesDespacho={ordenesDespacho}
        setOrdenesDespacho={setOrdenesDespacho}
        showButtonDelete={false}
        titlePage=""
      /> */}

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {cols_desktop.map((col) => (
                <TableCell align="center">{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenesDespacho.map((row) => (
              <TableRow
                key={row.item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.item}
                </TableCell>
                <TableCell align="center">{row.numeroPedido}</TableCell>
                <TableCell align="center">{row.numeroOrdenDespacho}</TableCell>
                <TableCell align="center">{row.canal}</TableCell>
                <TableCell align="center">{row.cliente}</TableCell>
                <TableCell align="center">{row.volumen}</TableCell>
                <TableCell align="center">{row.grupo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            <label for="checkboxToday" className="filter-checkbox-label">
              Hoy
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxYesterday" />
            <label for="checkboxYesterday" className="filter-checkbox-label">
              Ayer
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxSevenDays" />
            <label for="checkboxSevenDays" className="filter-checkbox-label">
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
              className="z-10 px-4 py-2 border-2 w-full rounded-l-md border-blue-800 focus:border-blue-700"
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
              className="px-4 py-2 border-2 w-full rounded-r-md border-blue-800 focus:border-blue-700"
            />
          </div>
        </div>

        <div className="filter-group-container">
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxOpcion1" />
            <label for="checkboxOpcion1" className="filter-checkbox-label">
              Opción 1
            </label>
          </div>
          <div className="filter-checkbox-container">
            <input type="checkbox" id="checkboxOpcion2" />
            <label for="checkboxOpcion2" className="filter-checkbox-label">
              Opción 2
            </label>
          </div>
        </div>

        <button className="bg-black w-full py-2 text-white my-4 rounded-md">
          Buscar
        </button>
      </FilterComponent>
    </div>
  );
};

export default GenerarOTyGRT;
