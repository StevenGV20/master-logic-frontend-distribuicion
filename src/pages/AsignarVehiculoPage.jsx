import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { PAGE_ASIGNAR_VEHICULO } from "../utils/titles";
import {
  ordenesDespachoFake
} from "../data/ordenesDespachoFake";
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import ModalMessage from "../components/ModalComponent";
import { TextareaAutosize } from "@mui/material";
import {listGroupsFake} from"../data/grupos";
import {listVehiculos} from "../data/listaVehiculos"

function Row(props) {
  const { row, isMobile } = props;
  const [open, setOpen] = React.useState(false);
  const [grupoToAsign, setGrupoToAsign] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSelected, setVehiculoSelected] = useState(null);

  const [ordenesDespacho, setOrdenesDespacho] = useState([]);

  useEffect(() => {
    return () => {
      setOrdenesDespacho(ordenesDespachoFake.result);
      setVehiculos(listVehiculos);
    };
  }, []);

  const calcularVolumenTotal = (ordenes) => {
    let totalVolumen = 0;
    for (let index = 0; index < ordenes.length; index++) {
      totalVolumen += ordenes[index].volumen;
    }
    return totalVolumen;
  };

  const calcularMontoTotal = (ordenes) => {
    let totalMonto = 0;
    for (let index = 0; index < ordenes.length; index++) {
      totalMonto += ordenes[index].monto;
    }
    return totalMonto;
  };

  const handleChange = (event) => {
    setVehiculoSelected(event.target.value);
  };

  const handleAsignGroup = (group) => {
    console.log(group);
    setGrupoToAsign(group);
    setOpenModal(true);
  };

  const [openModal, setOpenModal] = useState(false);
  const onAsignarVehiculo = () => {
    setOpenModal(false);
  };

  registerLocale("es", es);
  setDefaultLocale("es");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {isMobile ? (
          <>
            <TableCell colSpan={2}>
              <div>{row.name}</div>
              <div>{row.sede}</div>
              <div><div>Volumen total (m3):</div>{calcularVolumenTotal(row.ordenesDespacho)}</div>
              <div><div>Monto total:</div>{calcularMontoTotal(row.ordenesDespacho)}</div>
            </TableCell>
            <TableCell colSpan={1}>
              {row.vehiculo ? (
                row.vehiculo
              ) : (
                <div>
                  <button
                    className="bg-black text-white p-1 sm:py-2 sm:px-4 rounded-md"
                    onClick={() => handleAsignGroup(row)}
                  >
                    Asignar Vehiculo
                  </button>
                </div>
              )}
            </TableCell>
          </>
        ) : (
          <>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.sede}</TableCell>
            <TableCell align="center">
              {calcularVolumenTotal(row.ordenesDespacho)}
            </TableCell>
            <TableCell align="center">
              {calcularMontoTotal(row.ordenesDespacho)}
            </TableCell>
            <TableCell align="center">{}</TableCell>
            <TableCell align="center">
              {row.vehiculo ? (
                row.vehiculo
              ) : (
                <div>
                  <button
                    className="bg-black text-white py-2 px-4 rounded-md"
                    onClick={() => handleAsignGroup(row)}
                  >
                    Asignar Vehiculo
                  </button>
                </div>
              )}
            </TableCell>
            <TableCell align="center">{row.ruta}</TableCell>
            <TableCell align="center">{}</TableCell>
          </>
        )}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Ordenes de Despacho
              </Typography>
              <ListOrdenesDespachoComponent
                ordenesDespacho={ordenesDespacho}
                setOrdenesDespacho={setOrdenesDespacho}
                showButtonDelete={false}
                showPagination={false}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <ModalMessage
        open={openModal}
        setOpen={setOpenModal}
        title={"Asignar Vehiculo"}
        titleBtnAceptar={"Asignar"}
        onBtnAceptar={onAsignarVehiculo}
      >
        <div className="modal-group-container">
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">Grupo:</label>
              <div>GRUPO 3</div>
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Volumen:</label>
              <div>30 m3</div>
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">Vehiculo:</label>
              <FormControl fullWidth>
                <Select
                  style={{ border: "2px #0055B8 solid" }}
                  value={vehiculoSelected}
                  onChange={handleChange}
                >
                  {vehiculos.length > 0 &&
                    vehiculos.map((v) => (
                      <MenuItem value={v.placa}>
                        {v.conductor} - {v.capacidadDescripcion}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Volumen Asignado:</label>
              <div>
                {grupoToAsign &&
                  calcularVolumenTotal(grupoToAsign.ordenesDespacho)}
              </div>
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">Fecha de Salida:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                locale="es"
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-end"
                className="modal-group-input-md"
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Hora de Salida:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker defaultValue={dayjs(new Date())} />
              </LocalizationProvider>
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">Fecha de Carga:</label>
              <DatePicker
                selected={startDate}
                onChange={handleEndDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                locale="es"
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-end"
                className="modal-group-input-md"
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Hora de Carga:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  defaultValue={dayjs(new Date())}
                  className="modal-group-input-md"
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex">
            <div className="modal-group-item-container">
              <label htmlFor="">N° Palets:</label>
              <input type="text" className="modal-group-input-md -ml-1" />
            </div>
          </div>
          <div className="w-full block">
            <label htmlFor="" className="w-full">
              Observacion:
            </label>
            <TextareaAutosize
              minRows={4}
              className="border-2 border-blue-800 outline-none px-4 py-2 mt-2 w-full"
            />
          </div>
        </div>
      </ModalMessage>
    </React.Fragment>
  );
}

//const rows = listGroupsFake.result;

const AsignarVehiculoPage = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(listGroupsFake.result);
    console.log(listGroupsFake.result);
  }, []);

  const cols_desktop = [
    "GRUPO",
    "SEDE",
    "VOLUMEN (m3)",
    "MONTO TOTAL",
    "UBIGEO",
    "VEHÍCULO",
    "RUTA",
    "MONTO",
    "",
  ];

  const cols_mobile = ["GRUPO","","VEHÍCULO", ""];

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_ASIGNAR_VEHICULO} />
      </div>

      <div className="desktop">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {cols_desktop.map((col) => (
                  <TableCell align="center">{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row) => (
                  <Row key={row.name} row={row} isMobile={false} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mobile">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {cols_mobile.map((col) => (
                  <TableCell align="center" key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row) => (
                  <Row key={row.name} row={row} isMobile={true} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AsignarVehiculoPage;
