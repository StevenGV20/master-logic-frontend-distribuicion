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
  convertirDateTimeToDate,
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
    console.log(v_selected);
    setVehiculoSelected(v_selected);
    formik.setFieldValue("utr_codutr", v_selected.utr_codutr);
    formik.setFieldValue("utr_plautr", v_selected.utr_plautr);
    formik.setFieldValue("cho_codcho", v_selected.cho_codcho);
  };

  const onAsignarVehiculo = () => {
    setOpenModal(false);
  };

  registerLocale("es", es);
  setDefaultLocale("es");



  const showMessageCapacidadDisponible = (vehiculo) => {
    if (!(vehiculo.gruposAsignados && vehiculo.gruposAsignados.length > 0))
      return <span className="text-sm">No tiene ningun grupo asignado</span>;
    const volAsigTotal = calcularVolumenAsignadoTotal(vehiculo.gruposAsignados);
    const volDisponible =
      vehiculo.volumenMaximo -
      calcularVolumenAsignadoTotal(vehiculo.gruposAsignados);
    if (volDisponible < grupoToAsign.gru_volumen) {
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
      gru_grucod: grupoToAsign.gru_grucod,
      via_volumen: grupoToAsign.gru_volumen || 0,
      via_bultos: grupoToAsign.gru_bultos || 0,
      via_peso: grupoToAsign.gru_peso || 0,
      via_monto: grupoToAsign.gru_monto || 0,
      via_nroode: grupoToAsign.gru_nroode || 0,
      cho_codcho: grupoToAsign.cho_codcho || "",
      via_desfech: new Date(),
      via_deshor: dayjs(new Date()),
      fechaCarga: new Date(),
      horaCarga: dayjs(new Date()),
      via_carfch:"",
      via_palets: 0,
      via_observ: "",
    },
    onSubmit: (values) => {
      values.horaCarga = convertirDateToTimeString(values.horaCarga);
      values.via_deshor = convertirDateToTimeString(values.via_deshor);
      values.via_carfch = convertirDateTimeToDate(values.fechaCarga) + " " + values.horaCarga
      alert(JSON.stringify(values, null, 2));
      setOpenModal(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.cho_codcho) {
        errors.cho_codcho = "Debes elegir un vehiculo";
      }
      if (values.horaCarga == formik.initialValues.horaCarga) {
        errors.horaCarga = "Debes elegir una hora de carga";
      }
      if (values.via_deshor == formik.initialValues.via_deshor) {
        errors.horaSalida = "Debes elegir una hora de salida";
      }
      if (values.via_palets < 0) {
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
              defaultValue={formik.values.gru_grucod}
              name="gru_grucod"
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
              defaultValue={formik.values.via_volumen}
              name="gru_volumen"
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
              name="cho_codcho.cho_codcho"
            >
              {vehiculos.length > 0 &&
                vehiculos.map((v) => (
                  <MenuItem value={v}>
                    {v.cho_nombre}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {formik.errors.cho_codcho ? (
            <div className="text-xs text-red-500">{formik.errors.cho_codcho}</div>
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
            selected={formik.values.via_desfech}
            value={formik.values.via_desfech}
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
                defaultValue={formik.values.via_deshor}
                onChange={(time) => formik.setFieldValue("horaSalida", time)}
                name="horaSalida"
                className="form-container-group-content-input"
              />
            </LocalizationProvider>
            {formik.errors.via_deshor ? (
              <span className="text-xs text-red-500">
                {formik.errors.via_deshor}
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
              value={formik.values.via_palets}
              name="numeroPalets"
              onChange={formik.handleChange}
            />
            {formik.errors.via_palets ? (
              <span className="text-xs text-red-500">
                {formik.errors.via_palets}
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
            value={formik.values.via_observ}
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
