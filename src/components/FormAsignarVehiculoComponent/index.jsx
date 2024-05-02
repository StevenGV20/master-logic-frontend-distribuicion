import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

import { TextareaAutosize } from "@mui/material";

import { calcularVolumenTotal } from "../../utils/funciones";

const FormAsignarVehiculoComponent = ({
  vehiculos,
  grupoToAsign,
  setOpenModal,
}) => {
  const [vehiculoSelected, setVehiculoSelected] = useState(null);

  const handleChange = (event) => {
    setVehiculoSelected(event.target.value);
  };

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
    <div className="modal-group-container">
      <div className="modal-group-control-container">
        <div className="modal-group-item-container">
          <label htmlFor="">Grupo:</label>
          <div>{grupoToAsign.name}</div>
        </div>
        <div className="modal-group-item-container">
          <label htmlFor="">Volumen:</label>
          <div>
            {grupoToAsign && calcularVolumenTotal(grupoToAsign.ordenesDespacho)}{" "}
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
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={()=>onAsignarVehiculo()}
        >
          Aceptar
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpenModal(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FormAsignarVehiculoComponent;
