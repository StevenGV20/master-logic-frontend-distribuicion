import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/features/combos/sedeSlice";
import { postFetchFunction } from "../../utils/funciones";
import { API_DISTRIBUCION } from "../../utils/general";

const FormRutasComponent = ({
  rutaSelected,
  setOpenModal,
  setOpenMessage,
  setRefreshTable,
}) => {
  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("sedesCombo", sedesCombo);
    if (!(sedesCombo.length > 0)) dispatch(fetchData());
  }, []);

  const formik = useFormik({
    initialValues: {
      id: rutaSelected ? rutaSelected.id : 0,
      cia_codcia: rutaSelected ? rutaSelected.cia_codcia : "01",
      suc_codsuc: rutaSelected ? rutaSelected.suc_codsuc : "01",
      sed_codsed: rutaSelected ? rutaSelected.sed_codsed : "",
      rut_codigo: rutaSelected ? rutaSelected.rut_codigo : "",
      rut_descripcion: rutaSelected ? rutaSelected.rut_descripcion : "",
      rut_volmin: rutaSelected ? rutaSelected.rut_volmin : 0,
      rut_volmax: rutaSelected ? rutaSelected.rut_volmax : 0,
      rut_precio: rutaSelected ? rutaSelected.rut_precio : 0,
      rut_indest: rutaSelected ? rutaSelected.rut_indest : "0",
      rut_usuupd: "steve.guadana",      
    },
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));

      const postRuta = async () => {
        const result = await postFetchFunction(
          `${API_DISTRIBUCION}/saveRuta`,
          values,
          setOpenMessage
        );
        setRefreshTable((prev) => !prev);
        console.log("result postChofer", result);
      };
      postRuta();
      setOpenModal(false);
      setOpenMessage(true);
    },
    validate: (values) => {
      const errors = {};
      if (!values.sed_codsed) {
        errors.sed_codsed = "Debes ingresar la sede de la ruta";
      }
      if (!values.rut_codigo) {
        errors.rut_codigo = "Debes ingresar el nombre de la ruta";
      }
      if (!values.rut_descripcion) {
        errors.rut_descripcion = "Debes ingresar la descripcion de la ruta";
      }
      if (values.rut_volmin<0 || values.rut_volmin.length < 1) {
        errors.rut_volmin = "Debes ingresar el volumen Minimo";
      }
      if (!values.rut_volmax) {
        errors.rut_volmax = "Debes ingresar el volumen Maximo";
      }
      if (!values.rut_precio) {
        errors.rut_precio = "Debes ingresar el monto";
      }
      if (!values.rut_indest) {
        errors.rut_indest = "Debes ingresar el monto";
      }
      return errors;
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <div className="form-container-group-content">
          <label
            htmlFor="rut_codigo"
            className="form-container-group-content-label"
          >
            Codigo
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="rut_codigo"
              id="rut_codigo"
              value={formik.values.rut_codigo}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.rut_codigo
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.rut_codigo && (
              <span className="form-container-group-content-span-error">
                {formik.errors.rut_codigo}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label htmlFor="sed_codsed" className="form-container-group-content-label">
            Sede
          </label>
          <div className="mt-2">
            <select
              type="text"
              name="sed_codsed"
              id="sed_codsed"
              value={formik.values.sed_codsed}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.sed_codsed
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            >
              <option value="">[ Seleecione ]</option>
              {sedesCombo.map((sede) => (
                <option value={sede.sed_codsed}>{sede.sed_descor}</option>
              ))}
            </select>
            {formik.errors.sed_codsed && (
              <span className="form-container-group-content-span-error">
                {formik.errors.sed_codsed}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="rut_descripcion"
            className="form-container-group-content-label"
          >
            rut_descripcion
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="rut_descripcion"
              id="rut_descripcion"
              value={formik.values.rut_descripcion}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.rut_descripcion
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.rut_descripcion && (
              <span className="form-container-group-content-span-error">
                {formik.errors.rut_descripcion}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="rut_volmin"
            className="form-container-group-content-label"
          >
            Volumen Minimo
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="rut_volmin"
              id="rut_volmin"
              value={formik.values.rut_volmin}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.rut_volmin
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.rut_volmin && (
              <span className="form-container-group-content-span-error">
                {formik.errors.rut_volmin}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="rut_volmax"
            className="form-container-group-content-label"
          >
            Volumen Maximo
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="rut_volmax"
              id="rut_volmax"
              value={formik.values.rut_volmax}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.rut_volmax
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.rut_volmax && (
              <span className="form-container-group-content-span-error">
                {formik.errors.rut_volmax}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="rut_precio"
            className="form-container-group-content-label"
          >
            Precio
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="rut_precio"
              id="rut_precio"
              value={formik.values.rut_precio}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.rut_precio
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.rut_precio && (
              <span className="form-container-group-content-span-error">
                {formik.errors.rut_precio}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="rut_indest"
            className="form-container-group-content-label"
          >
            rut_indest
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="rut_indest"
              id="rut_indest"
              value={formik.values.rut_indest}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.rut_indest
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.rut_indest && (
              <span className="form-container-group-content-span-error">
                {formik.errors.rut_indest}
              </span>
            )}
          </div>
        </div>

      </div>
      <div className="form-buttons-container">
        <button
          type="button"
          className="form-buttons-container-btncancel"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
        <button type="submit" className="form-buttons-container-btnaccept">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormRutasComponent;
