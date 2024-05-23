import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/features/combos/sedeSlice";

import {
  calcularBultosTotal,
  calcularMontoTotal,
  calcularPesoTotal,
  calcularVolumenTotal,
  convertirDateTimeToDate,
  postFetchFunction,
  postFetchFunctionCustomFunction,
} from "../../utils/funciones";
import { objOrdenesDespachoEntity } from "../../api/ordenesDespachoApi";
import {
  API_DISTRIBUCION,
  ORDENES_DESPACHO_TABLE_CART_COLS,
  PEN_CURRENCY,
} from "../../utils/general";
import TableCustom from "../widgets/TableComponent";
import ModalMessage from "../widgets/ModalComponent";
import FormEditCargaOrdenDespachoComponent from "../FormEditCargaOrdenDespachoComponent";
import AlertMessage from "../widgets/AlertMessage";

const FormCarritoAgrupacionODComponent = ({
  carritoOrdenesDespacho = objOrdenesDespachoEntity.result,
  handleSelectRow,
  setCarritoOrdenesDespacho,
  setOpenCarritoGrupos,
  setRefreshTable,
}) => {
  registerLocale("es", es);
  setDefaultLocale("es");

  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  const [openEditOrden, setOpenEditOrden] = useState(false);
  const [ordenSelected, setOrdenSelected] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    if (!(sedesCombo.length > 0)) dispatch(fetchData());
  }, []);

  const formik = useFormik({
    initialValues: {
      cia_codcia: "01",
      sed_sedcod: "",
      gru_desfch: new Date(),
      gru_observ: "",
      gru_volumen: calcularVolumenTotal(carritoOrdenesDespacho),
      gru_bultos: calcularBultosTotal(carritoOrdenesDespacho),
      gru_peso: calcularPesoTotal(carritoOrdenesDespacho),
      gru_monto: calcularMontoTotal(carritoOrdenesDespacho),
      gru_nroode: carritoOrdenesDespacho.length,
      gru_insusu: localStorage.getItem("USERNAME"),
      listaOrdenesDespacho: carritoOrdenesDespacho,
      isErrorItems: false,
    },
    validate: (values) => {
      const errors = {};
      if (!(values.gru_volumen > 0))
        errors.gru_volumen = "Debes agregar el volumen a los item";

      if (!(values.gru_bultos > 0))
        errors.gru_bultos = "Debes agregar el bulto a los item";

      if (!(values.gru_peso > 0))
        errors.gru_peso = "Debes agregar el peso a los item";

      if (!values.sed_sedcod) errors.sed_sedcod = "Debes seleccionar una sede";

      if (values.isErrorItems)
        errors.listaOrdenesDespacho =
          "Debes ingresar las cantidades solicitadas en los items";
      return errors;
    },
    onSubmit: (values) => {
      let listODs = "";
      values.listaOrdenesDespacho.map(
        (o, index) => (listODs += (index > 0 ? "," : "") + o.id)
      );

      delete values.isErrorItems;
      delete values.volumen;
      delete values.bultos;
      delete values.peso;
      delete values.monto;
      delete values.listaOrdenesDespacho;

      let data = { grupo: values, listaOds: listODs };

      //console.log(JSON.stringify(data, null, 2));

      const afterPost = (data) => {
        if (data.statusCode === 200) {
          localStorage.setItem("ODSAGRUPAR", null);
          //setCarritoOrdenesDespacho([]);
          setTimeout(() => {
            setRefreshTable((prev) => !prev);
            setOpenCarritoGrupos(false);
          }, 3000);
        }
      };
      postFetchFunctionCustomFunction(
        `${API_DISTRIBUCION}/grupo/save`,
        data,
        setOpenMessage,
        afterPost
      );
    },
  });

  useEffect(() => {
    formik.setFieldValue("listaOrdenesDespacho", carritoOrdenesDespacho);
    formik.setFieldValue(
      "gru_volumen",
      calcularVolumenTotal(carritoOrdenesDespacho)
    );
    formik.setFieldValue(
      "gru_bultos",
      calcularBultosTotal(carritoOrdenesDespacho)
    );
    formik.setFieldValue("gru_peso", calcularPesoTotal(carritoOrdenesDespacho));
    formik.setFieldValue(
      "gru_monto",
      calcularMontoTotal(carritoOrdenesDespacho)
    );
  }, [carritoOrdenesDespacho]);

  const verifyCantidad = (cantidad, index, tipo) => {
    if (!(cantidad > 0)) {
      formik.values.isErrorItems = true;
      return (
        <span className="form-container-group-content-span-error">
          <br />
          Ingresa {tipo}
        </span>
      );
    } else {
      formik.values.isErrorItems = false;
    }
  };

  return (
    <>
      <ModalMessage
        open={openEditOrden}
        setOpen={setOpenEditOrden}
        title={"Editar Carga de la Orden de Despacho"}
        titleBtnAceptar={""}
        showButtons={false}
        onBtnAceptar={() => setOpenEditOrden(false)}
      >
        <FormEditCargaOrdenDespachoComponent
          ordenSelected={ordenSelected}
          setOpenModal={setOpenEditOrden}
          setCarritoOrdenesDespacho={setCarritoOrdenesDespacho}
        />
      </ModalMessage>
      <AlertMessage openMessage={openMessage} setOpenMessage={setOpenMessage} />

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
                  {/* {verifyCantidad(orden.odc_distancia, index, "la distancia")} */}
                </td>
                <td>
                  {" "}
                  <div className="">
                    <button
                      onClick={() => {
                        setOrdenSelected(orden);
                        setOpenEditOrden(true);
                      }}
                    >
                      <EditIcon className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => {
                        handleSelectRow(orden);
                      }}
                    >
                      <DeleteIcon className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TableCustom>
        </div>
        {carritoOrdenesDespacho.map((orden, index) => (
          <div className="grid grid-cols-12 md:hidden" key={index}>
            <div className="col-span-1 content-center">{index + 1}</div>
            <div className="td-group-mobile p-2 text-sm col-span-10">
              <div>
                <label>Orden de Despacho:</label>
                <div className="flex space-x-4">
                  <div>{orden.odc_numodc}</div>
                  <div>{convertirDateTimeToDate(orden.odc_fecdoc)}</div>
                </div>
              </div>
              <div>
                <label>Pedido:</label>
                <div className="flex space-x-4">
                  <div>{orden.ppc_numppc}</div>
                </div>
              </div>
              <div>
                <label htmlFor="">Canal:</label> {orden.canal}
              </div>
              <div>
                <label>Cliente:</label>
                <div>{orden.aux_nomaux}</div>
                <div>{orden.odc_dirdes}</div>
                <div>{orden.odc_ubigeo}</div>
              </div>
              <div className="block space-x-3">
                <label>Carga:</label>
                <div className="grid grid-cols-2">
                  <div>{orden.odc_volumen}</div>
                  <div>{orden.odc_bultos} bultos</div>
                  <div>{orden.odc_peso}</div>
                  <div>
                    {PEN_CURRENCY}{" "}
                    {orden.odc_imptot && orden.odc_imptot.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 content-center">
              <button onClick={() => setOrdenSelected(orden)}>
                <EditIcon className="text-gray-500 text-center" />
              </button>
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
        {formik.errors.listaOrdenesDespacho ? (
          <div className="w-full col-span-2">
            <div className="w-full text-base text-red-500 col-span-2 text-center mb-4">
              {formik.errors.listaOrdenesDespacho}
            </div>
          </div>
        ) : null}

        <div className="col-span-2 w-full grid grid-cols-4 items-center">
          <label htmlFor="" className="col-span-1">
            SEDE
          </label>
          <select
            type="text"
            name="sed_sedcod"
            id="sed_sedcod"
            value={formik.values.sed_sedcod}
            onChange={formik.handleChange}
            autoComplete="given-name"
            className={`p-2 outline-none border-2 border-blue-600 focus:ring-blue-600 focus:ring-2`}
          >
            <option value="">[ Seleecione ]</option>
            {sedesCombo.map((sede) => (
              <option key={sede.sed_codsed} value={sede.sed_codsed}>
                {sede.sed_descor}
              </option>
            ))}
          </select>
          {formik.errors.sed_sedcod ? (
            <div className="text-sm text-red-500 col-span-2 text-left ml-2">
              {formik.errors.sed_sedcod}
            </div>
          ) : null}
        </div>
        <div className="w-full grid grid-cols-2">
          <label htmlFor="">ENTREGA</label>
          <DatePicker
            selected={formik.values.gru_desfch}
            value={formik.values.gru_desfch}
            onChange={(date) => formik.setFieldValue("fechaEntrega", date)}
            name="gru_desfch"
            id="gru_desfch"
            selectsStart
            locale="es"
            dateFormat="dd/MM/yyyy"
            popperPlacement="bottom-end"
            className="w-full p-2 border-2 border-blue-600 focus:ring-2 focus: ring-blue-600 outline-none"
          />
          {formik.errors.gru_desfch ? (
            <div className="text-sm text-red-500 col-span-2 text-left ml-2">
              {formik.errors.gru_desfch}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 space-y-2">
          <label htmlFor="">Observación</label>
          <textarea
            className="border-2 border-gray-700 p-2 outline-none w-full"
            rows={4}
            value={formik.values.gru_observ}
            name="gru_observ"
            id="gru_observ"
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Vol. m3</label>
          <input
            type="text"
            value={formik.values.gru_volumen}
            name="gru_volumen"
            className=""
            readOnly
          />
          {formik.errors.gru_volumen ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.gru_volumen}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Bultos</label>
          <input
            type="text"
            value={formik.values.gru_bultos}
            name="gru_bultos"
            className=""
            readOnly
          />
          {formik.errors.gru_bultos ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.gru_bultos}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Peso</label>
          <input
            type="text"
            value={formik.values.gru_peso}
            name="gru_peso"
            className=""
            readOnly
          />
          {formik.errors.gru_peso ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.gru_peso}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">Monto</label>
          <input
            type="text"
            value={formik.values.gru_monto}
            name="gru_monto"
            className=""
            readOnly
          />
          {formik.errors.gru_monto ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.gru_monto}
            </div>
          ) : null}
        </div>
        <div className="w-full col-span-2 grid grid-cols-2">
          <label htmlFor="">N° ODs</label>
          <input
            type="text"
            value={carritoOrdenesDespacho.length}
            className=""
            name="gru_nroode"
            readOnly
          />
        </div>
        <div className="col-span-2">
          <button
            className="w-full mt-4 bg-black py-2 text-white"
            type="submit"
            onClick={formik.handleSubmit}
          >
            AGRUPAR OD
          </button>
        </div>
      </form>
    </>
  );
};

export default FormCarritoAgrupacionODComponent;
