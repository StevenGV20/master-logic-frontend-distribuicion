import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/features/combos/sedeSlice";

import {
  calcularBultosTotal,
  calcularMontoTotal,
  calcularPesoTotal,
  calcularVolumenTotal,
  convertirDateTimeToDate,
} from "../../utils/funciones";
import { objOrdenesDespachoEntity } from "../../api/ordenesDespachoApi";
import { PEN_CURRENCY } from "../../utils/general";

const FormCarritoAgrupacionODComponent = ({
  carritoOrdenesDespacho=objOrdenesDespachoEntity.result,
  handleSelectRow,
}) => {
  registerLocale("es", es);
  setDefaultLocale("es");

  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(sedesCombo.length > 0)) dispatch(fetchData());
  }, []);

  const formik = useFormik({
    initialValues: {
      sede: "",
      fechaEntrega: new Date(),
      observacion: "",
      volumen: calcularVolumenTotal(carritoOrdenesDespacho),
      bultos: calcularBultosTotal(carritoOrdenesDespacho),
      peso: calcularPesoTotal(carritoOrdenesDespacho),
      monto: calcularMontoTotal(carritoOrdenesDespacho),
      numeroOrdenes: carritoOrdenesDespacho.length,
      listaOrdenesDespacho: carritoOrdenesDespacho,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("listaOrdenesDespacho", carritoOrdenesDespacho);
    formik.setFieldValue(
      "volumen",
      calcularVolumenTotal(carritoOrdenesDespacho)
    );
    formik.setFieldValue("bultos", calcularBultosTotal(carritoOrdenesDespacho));
    formik.setFieldValue("peso", calcularPesoTotal(carritoOrdenesDespacho));
    formik.setFieldValue("monto", calcularMontoTotal(carritoOrdenesDespacho));
  }, [carritoOrdenesDespacho]);

  return (
    <>
      {carritoOrdenesDespacho.map((orden, index) => (
        <div className="grid grid-cols-12" key={index}>
          <div className="col-span-1 content-center">{index + 1}</div>
          <div className="td-group-mobile p-2 text-sm col-span-10">
            <div>
              <label>Pedido:</label>
              <div className="flex space-x-4">
                <div>{orden.ppc_numppc}</div>
                <div>{orden.emisionPedido}</div>
              </div>
            </div>
            <div>
              <label>Orden de Despacho:</label>
              <div className="flex space-x-4">
                <div>{orden.odc_numodc}</div>
                <div>{convertirDateTimeToDate(orden.odc_fecdoc)}</div>
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
                <div>{PEN_CURRENCY} {orden.monto && orden.monto.toFixed(2)}</div>
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

      <form
        className="mt-4 py-4 grid grid-cols-2 space-y-1"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="">SEDE</label>
        <select
          type="text"
          name="sede"
          id="sede"
          value={formik.values.sede}
          onChange={formik.handleChange}
          autoComplete="given-name"
          className={`p-2 outline-none focus:ring-blue-600 focus:ring-2`}
        >
          <option value="">[ Seleecione ]</option>
          {sedesCombo.map((sede) => (
            <option value={sede.sed_codsed}>{sede.sed_descor}</option>
          ))}
        </select>
        <label htmlFor="">ENTREGA</label>
        <DatePicker
          selected={formik.values.fechaEntrega}
          value={formik.values.fechaEntrega}
          onChange={(date) => formik.setFieldValue("fechaEntrega", date)}
          name="fechaEntrega"
          id="fechaEntrega"
          selectsStart
          locale="es"
          dateFormat="dd/MM/yyyy"
          popperPlacement="bottom-end"
          className="w-full py-1 px-0.5 focus:ring-2 focus: ring-blue-600 outline-none"
        />
        <div className="w-full col-span-2 space-y-2">
          <label htmlFor="">Observación</label>
          <textarea
            className="border-2 border-gray-700 p-2 outline-none w-full"
            rows={4}
            value={formik.values.observacion}
            name="observacion"
            id="observacion"
            onChange={formik.handleChange}
          />
        </div>
        <label htmlFor="">Vol. m3</label>
        <input
          type="text"
          value={formik.values.volumen}
          name="volumen"
          className=""
          readOnly
        />
        <label htmlFor="">Bultos</label>
        <input
          type="text"
          value={formik.values.bultos}
          name="bultos"
          className=""
          readOnly
        />
        <label htmlFor="">Peso</label>
        <input
          type="text"
          value={formik.values.peso}
          name="peso"
          className=""
          readOnly
        />
        <label htmlFor="">Monto</label>
        <input
          type="text"
          value={formik.values.monto}
          name="monto"
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
      </form>
    </>
  );
};

export default FormCarritoAgrupacionODComponent;
