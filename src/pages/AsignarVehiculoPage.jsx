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
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

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
import ListOrdenesDespachoComponent from "../components/ListOrdenesDespachoComponent";
import ModalMessage from "../components/ModalComponent";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { URL_MASTERLOGIC_API } from "../utils/general";
import {
  calcularMontoTotal,
  calcularVolumenAsignadoTotal,
  calcularVolumenTotal,
} from "../utils/funciones";
import TableCustom from "../components/TableComponent";
import TableCollapseCustomComponent from "../components/TableComponent/TableCollapseCustomComponent";

function Row(props) {
  const { row, isMobile, vehiculos, setVehiculos, loadingTable } = props;
  const [open, setOpen] = React.useState(false);
  const [grupoToAsign, setGrupoToAsign] = useState(null);
  const [vehiculoSelected, setVehiculoSelected] = useState(null);

  const handleChange = (event) => {
    setVehiculoSelected(event.target.value);
  };

  const handleAsignGroup = (group) => {
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
              <div>
                <div>Volumen total (m3):</div>
                {calcularVolumenTotal(row.ordenesDespacho)}
              </div>
              <div>
                <div>Monto total:</div>
                {calcularMontoTotal(row.ordenesDespacho)}
              </div>
            </TableCell>
            <TableCell colSpan={1}>
              {row.vehiculo ? (
                <div className="flex space-x-2 justify-center w-full">
                  <div>{row.vehiculo}</div>
                  <button className="z-50">
                    <DeleteIcon className="text-red-600" />
                  </button>
                </div>
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
                <div className="flex space-x-2 justify-center w-full">
                  <div>{row.vehiculo}</div>
                  <button className="z-50">
                    <DeleteIcon className="text-red-600" />
                  </button>
                </div>
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
                ordenesDespacho={row.ordenesDespacho}
                setOrdenesDespacho={() => <></>}
                showButtonDelete={false}
                showPagination={false}
                titlePage=""
                loadingTable={false}
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
              <div>
                {grupoToAsign &&
                  calcularVolumenTotal(grupoToAsign.ordenesDespacho)}{" "}
                m3
              </div>
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
                      <MenuItem value={v.vehiculo}>
                        {v.chofer} - {v.volumenMaximo}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Volumen Asignado:</label>
              <div></div>
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
  const [grupos, setGrupos] = useState([]);
  /* useEffect(() => {
    setGrupos(listGroupsFake.result);
    console.log(listGroupsFake.result);
  }, []);
 */
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const fetchGrupos = async (filtros) => {
      try {
        const response = await fetch(`${URL_MASTERLOGIC_API}/grupos.json`);
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        setGrupos(data);
        setLoadingTable(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGrupos();
  }, []);

  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch(`${URL_MASTERLOGIC_API}/vehiculos.json`);
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        setVehiculos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehiculos();
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

  const cols_mobile = ["GRUPO", " ", "VEHÍCULO", ""];
  const cols_vehiculos_disponibilidad = [
    "VEHÍCULO",
    "CHOFER",
    "SEDE",
    "VOLUMEN MAXIMO (m3)",
    "VOLUMEN ACTUAL ASIGNADO (m3)",
    "VOLUMEN DISPONIBLE (m3)",
  ];

  const [openModalVehiculos, setOpenModalVehiculos] = useState(false);

  return (
    <div className="page-container">
      <div className="w-2/3">
        <BreadcrumbComponent message={PAGE_ASIGNAR_VEHICULO} />
      </div>
      <div className="w-full flex my-3">
        <div className="w-3/6 lg:w-9/12"></div>
        <button
          onClick={() => setOpenModalVehiculos(true)}
          className="w-2/6 lg:w-2/12 bg-black text-white py-4"
        >
          Ver Disponibilidad de Vehiculos
        </button>
        {/* 
        <div className="w-1/6 lg:w-1/12 text-center content-center grid justify-items-center">
          <div className="w-5 ml-4">
            <button onClick={() => setOpenFilter(true)}>
              <FilterAltIcon />
            </button>
          </div>
        </div> */}
      </div>
      <ModalMessage
        open={openModalVehiculos}
        setOpen={setOpenModalVehiculos}
        title={"Disponibilidad de Vehiculos"}
        titleBtnAceptar={"Aceptar"}
        onBtnAceptar={() => setOpenModalVehiculos(false)}
      >
        <div>
          <TableCustom cols={cols_vehiculos_disponibilidad}>
            {vehiculos.map((vehiculo) => {
              const totalVolumenAsignado = vehiculo.gruposAsignados
                ? calcularVolumenAsignadoTotal(vehiculo.gruposAsignados)
                : 0;
              return (
                <tr>
                  <td>{vehiculo.vehiculo}</td>
                  <td>{vehiculo.chofer}</td>
                  <td>{vehiculo.sede}</td>
                  <td>{vehiculo.volumenMaximo}</td>
                  <td>{totalVolumenAsignado}</td>
                  <td>{vehiculo.volumenMaximo - totalVolumenAsignado}</td>
                </tr>
              );
            })}
          </TableCustom>

          <TableCollapseCustomComponent
            cols={cols_vehiculos_disponibilidad}
            loadingTable={false}
          >
            <div>
              {vehiculos.map((vehiculo) => {
                const totalVolumenAsignado = vehiculo.gruposAsignados
                  ? calcularVolumenAsignadoTotal(vehiculo.gruposAsignados)
                  : 0;
                return (
                  <tr key={vehiculo.vehiculo}>
                    <td>{vehiculo.vehiculo}</td>
                    <td>{vehiculo.chofer}</td>
                    <td>{vehiculo.sede}</td>
                    <td>{vehiculo.volumenMaximo}</td>
                    <td>{totalVolumenAsignado}</td>
                    <td>{vehiculo.volumenMaximo - totalVolumenAsignado}</td>
                  </tr>
                );
              })}
            </div>
          </TableCollapseCustomComponent>
        </div>
      </ModalMessage>

      <div className="desktop p-2 md:p-4">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {cols_desktop.map((col) => (
                  <TableCell align="center" key={col}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingTable ? (
                grupos.result.map((row) => (
                  <Row
                    key={row.name}
                    row={row}
                    isMobile={false}
                    loadingTable={loadingTable}
                    vehiculos={vehiculos}
                    setVehiculos={setVehiculos}
                  />
                ))
              ) : (
                <td colSpan={cols_desktop.length}>
                  <CircularProgress />
                </td>
              )}
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
                  <TableCell align="center" key={col + "-mobile"}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingTable ? (
                grupos.result.map((row) => (
                  <Row
                    key={row.item}
                    row={row}
                    isMobile={true}
                    loadingTable={loadingTable}
                    vehiculos={vehiculos}
                    setVehiculos={setVehiculos}
                  />
                ))
              ) : (
                <td colSpan={cols_desktop.length}>
                  <CircularProgress />
                </td>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AsignarVehiculoPage;
