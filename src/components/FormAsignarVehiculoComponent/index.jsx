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
import { useFormik } from "formik";

import {
  calcularVolumenAsignadoTotal,
  calcularVolumenTotal,
  convertirDateToTimeString,
} from "../../utils/funciones";

const FormAsignarVehiculoComponent = ({
  vehiculos,
  grupoToAsign,
  setOpenModal,
}) => {
  const [vehiculoSelected, setVehiculoSelected] = useState(null);

  const handleChange = (event) => {
    const v_selected = event.target.value;
    setVehiculoSelected(v_selected);
    formik.setFieldValue("vehiculo", v_selected.vehiculo);
  };

  const onAsignarVehiculo = () => {
    setOpenModal(false);
  };

  registerLocale("es", es);
  setDefaultLocale("es");

  const grupoVolumenTotal = calcularVolumenTotal(grupoToAsign.ordenesDespacho);

  const showMessageCapacidadDisponible = (vehiculo) => {
    if (!(vehiculo.gruposAsignados && vehiculo.gruposAsignados.length > 0))
      return <span className="text-sm">No tiene ningun grupo asignado</span>;
    const volAsigTotal = calcularVolumenAsignadoTotal(vehiculo.gruposAsignados);
    const volDisponible =
      vehiculo.volumenMaximo -
      calcularVolumenAsignadoTotal(vehiculo.gruposAsignados);
    if (volDisponible < grupoVolumenTotal) {
      return (
        <>
          <div className="">{volAsigTotal}</div>
          <span className="form-container-group-content-span-error text-xs">
            Este grupo supera la capacidad disponible
          </span>
        </>
      );
    } else
      return (
        <div>
          <span>{volAsigTotal}</span>
        </div>
      );
  };

  const formik = useFormik({
    initialValues: {
      nombre: grupoToAsign.name,
      volumen: grupoToAsign ? grupoVolumenTotal : 0,
      vehiculo: "",
      fechaSalida: new Date(),
      horaSalida: dayjs(new Date()),
      fechaCarga: new Date(),
      horaCarga: dayjs(new Date()),
      numeroPalets: 0,
      observacion: "",
    },
    onSubmit: (values) => {
      values.horaCarga = convertirDateToTimeString(values.horaCarga);
      values.horaSalida = convertirDateToTimeString(values.horaSalida);
      alert(JSON.stringify(values, null, 2));
      setOpenModal(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.vehiculo) {
        errors.vehiculo = "Debes elegir un vehiculo";
      }
      if (values.horaCarga == formik.initialValues.horaCarga) {
        errors.horaCarga = "Debes elegir una hora de carga";
      }
      if (values.horaSalida == formik.initialValues.horaSalida) {
        errors.horaSalida = "Debes elegir una hora de salida";
      }
      if (values.numeroPalets < 0) {
        errors.numeroPalets = "El numero de Palets no puede ser menor a 0";
      }
      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <div className="form-container-group-content">
          <label className="form-container-group-content-label">Grupo:</label>
          <div>
            <input
              type="text"
              value={formik.values.nombre}
              name="nombre"
              readOnly
              className="p-4"
            />
          </div>
        </div>
        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Volumen (m3):
          </label>
          <div className="flex">
            <input
              type="text"
              value={formik.values.volumen}
              name="nombre"
              readOnly
              className="p-4"
            />
          </div>
        </div>
        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Vehiculo:
          </label>

          <FormControl fullWidth className="form-container-group-content-input">
            <Select
              style={{
                border: "0.5px #0055B8 solid",
                boxShadow: "--tw-ring-color: #0055B8",
                outline: "none",
              }}
              value={vehiculoSelected}
              onChange={handleChange}
              className="border-blue-200"
            >
              {vehiculos.length > 0 &&
                vehiculos.map((v) => (
                  <MenuItem value={v}>
                    {v.chofer} - {v.volumenMaximo}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {formik.errors.vehiculo ? (
            <div className="text-xs text-red-500">{formik.errors.vehiculo}</div>
          ) : null}
        </div>

        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Volumen Asignado:
          </label>
          {vehiculoSelected && showMessageCapacidadDisponible(vehiculoSelected)}
          {/* {vehiculoSelected &&
              (vehiculoSelected.gruposAsignados &&
              vehiculoSelected.gruposAsignados.length > 0 ? (
                calcularVolumenAsignadoTotal(vehiculoSelected.gruposAsignados)
              ) : (
                <span className="text-sm">
                  Este grupo supera la capacidad disponible
                </span>
              ))} */}
        </div>
        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Fecha de Salida:
          </label>
          <DatePicker
            selected={formik.values.fechaSalida}
            value={formik.values.fechaSalida}
            onChange={(date) => formik.setFieldValue("fechaSalida", date)}
            locale="es"
            name="fechaSalida"
            dateFormat="dd/MM/yyyy"
            popperPlacement="bottom-end"
            className="form-container-group-content-input border-blue-700"
          />
        </div>

        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Hora de Salida:
          </label>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                defaultValue={formik.values.horaSalida}
                onChange={(time) => formik.setFieldValue("horaSalida", time)}
                name="horaSalida"
                className="form-container-group-content-input"
              />
            </LocalizationProvider>
            {formik.errors.horaSalida ? (
              <span className="text-xs text-red-500">
                {formik.errors.horaSalida}
              </span>
            ) : null}
          </div>
        </div>
        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Fecha de Carga:
          </label>
          <div className="w-full">
            <DatePicker
              selected={formik.values.fechaCarga}
              value={formik.values.fechaCarga}
              onChange={(time) => formik.setFieldValue("fechaCarga", time)}
              locale="es"
              name="fechaCarga"
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom-end"
              className="form-container-group-content-input w-full"
            />
          </div>
        </div>

        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Hora de Carga:
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              defaultValue={formik.values.horaCarga}
              name="horaCarga"
              onChange={(time) => formik.setFieldValue("horaCarga", time)}
              className="form-container-group-content-input"
            />
          </LocalizationProvider>
          {formik.errors.horaCarga ? (
            <div className="text-xs text-red-500">
              {formik.errors.horaCarga}
            </div>
          ) : null}
        </div>
        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            N° Palets:
          </label>
          <div>
            <input
              type="number"
              className="form-container-group-content-input"
              value={formik.values.numeroPalets}
              name="numeroPalets"
              onChange={formik.handleChange}
            />
            {formik.errors.numeroPalets ? (
              <span className="text-xs text-red-500">
                {formik.errors.numeroPalets}
              </span>
            ) : null}
          </div>
        </div>
        <div className="form-container-group-content col-span-6">
          <label htmlFor="" className="w-full">
            Observacion:
          </label>
          <TextareaAutosize
            minRows={4}
            className="form-container-group-content-input"
            value={formik.values.observacion}
            name="observacion"
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Aceptar
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => onAsignarVehiculo()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormAsignarVehiculoComponent;
