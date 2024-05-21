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
import {
  ORDENES_DESPACHO_TABLE_CART_COLS,
  PEN_CURRENCY,
} from "../../utils/general";
import TableCustom from "../widgets/TableComponent";

const FormCarritoAgrupacionODComponent = ({
  carritoOrdenesDespacho = objOrdenesDespachoEntity.result,
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
    validate: (values) => {
      const errors = {};
      if (!(values.volumen > 0))
        errors.volumen = "Debes agregar el volumen a los item";
      if (!(values.bultos > 0))
        errors.bultos = "Debes agregar el bulto a los item";
      if (!(values.peso > 0))
        errors.peso = "Debes agregar el peso a los item";
      return errors;
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

  const verifyCantidad = (cantidad, index, tipo) => {
    if (!(cantidad > 0)) {
      return (
        <span className="form-container-group-content-span-error">
          <br />
          Ingresa {tipo}
        </span>
      );
    }
  };
  return (
    <>
      <div className="overflow-scroll overflow-x-hidden max-h-96">
        <div className="desktop">
          <TableCustom cols={ORDENES_DESPACHO_TABLE_CART_COLS}>
            {carritoOrdenesDespacho.map((orden, index) => (
              <tr key={orden.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="td-group">
                    <div>{orden.odc_numodc}</div>
                  </div>
                  <div className="td-group">
                    <div>
                      {orden.odc_fecdoc &&
                        convertirDateTimeToDate(orden.odc_fecdoc)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="td-group">
                    <div>{orden.ppc_numppc}</div>
                  </div>
                </td>
                <td>
                  {orden.odc_volumen}{" "}
                  {verifyCantidad(orden.odc_volumen, index, "el volumen")}
                </td>
                <td>
                  {orden.odc_bultos}{" "}
                  {verifyCantidad(orden.odc_bultos, index, "los bultos")}
                </td>
                <td>
                  {orden.odc_peso}{" "}
                  {verifyCantidad(orden.odc_peso, index, "el peso")}
                </td>
                <td>
                  {orden.odc_distancia}{" "}
                  {verifyCantidad(orden.odc_distancia, index, "la distancia")}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      handleSelectRow(orden);
                    }}
                  >
                    <DeleteIcon className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </TableCustom>
        </div>
        {carritoOrdenesDespacho.map((orden, index) => (
          <div className="grid grid-cols-12 mobile" key={index}>
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
                  <div>
                    {PEN_CURRENCY} {orden.monto && orden.monto.toFixed(2)}
                  </div>
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
      </div>
      <form
        className="mt-4 py-4 grid grid-cols-2 space-y-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-span-2 w-full grid grid-cols-4">
          <label htmlFor="" className="col-span-1">
            SEDE
          </label>
          <select
            type="text"
            name="sede"
            id="sede"
            value={formik.values.sede}
            onChange={formik.handleChange}
            autoComplete="given-name"
            className={`p-2 outline-none border-2 border-blue-600 focus:ring-blue-600 focus:ring-2 col-span-1`}
          >
            <option value="">[ Seleecione ]</option>
            {sedesCombo.map((sede) => (
              <option key={sede.sed_codsed} value={sede.sed_codsed}>
                {sede.sed_descor}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full grid grid-cols-2">
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
            className="w-full p-2 border-2 border-blue-600 focus:ring-2 focus: ring-blue-600 outline-none"
          />
        </div>
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
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Vol. m3</label>
          <input
            type="text"
            value={formik.values.volumen}
            name="volumen"
            className=""
            readOnly
          />
          {formik.errors.volumen ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.volumen}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Bultos</label>
          <input
            type="text"
            value={formik.values.bultos}
            name="bultos"
            className=""
            readOnly
          />
          {formik.errors.bultos ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.bultos}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Peso</label>
          <input
            type="text"
            value={formik.values.peso}
            name="peso"
            className=""
            readOnly
          />
          {formik.errors.peso ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.peso}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Monto</label>
          <input
            type="text"
            value={formik.values.monto}
            name="monto"
            className=""
            readOnly
          />
          {formik.errors.monto ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.monto}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">N° ODs</label>
          <input
            type="text"
            value={carritoOrdenesDespacho.length}
            className=""
            readOnly
          />
        </div>
        <div className="col-span-2">
          <button
            className="w-full mt-4 bg-black py-2 text-white"
            type="button"
          >
            AGRUPAR OD
          </button>
        </div>
      </form>
    </>
  );
};

export default FormCarritoAgrupacionODComponent;
