import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/features/combos/sedeSlice";

const FormRutasComponent = ({ rutaSelected, setOpenModal }) => {  

  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  useEffect(() => {    
    console.log("sedesCombo", sedesCombo);
    if (!(sedesCombo.length > 0)) dispatch(fetchData());
  }, []);

  const formik = useFormik({
    initialValues: {
      codigo: rutaSelected ? rutaSelected.codigo : "",
      sede: rutaSelected ? rutaSelected.sede : "",
      descripcion: rutaSelected ? rutaSelected.descripcion : "",
      volumenMinimo: rutaSelected ? rutaSelected.volumenMinimo : "",
      volumenMaximo: rutaSelected ? rutaSelected.volumenMaximo : "",
      monto: rutaSelected ? rutaSelected.monto : "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setOpenModal(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.sede) {
        errors.sede = "Debes ingresar la sede de la ruta";
      }
      if (!values.descripcion) {
        errors.descripcion = "Debes ingresar el nombre de la ruta";
      }
      if (!values.volumenMinimo) {
        errors.volumenMinimo = "Debes ingresar el volumen Minimo";
      }
      if (!values.volumenMaximo) {
        errors.volumenMaximo = "Debes ingresar el volumen Maximo";
      }
      if (!values.monto) {
        errors.monto = "Debes ingresar el monto";
      }
      return errors;
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <div className="form-container-group-content">
          <label
            htmlFor="codigo"
            className="form-container-group-content-label"
          >
            Codigo
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="codigo"
              id="codigo"
              value={formik.values.codigo}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.codigo
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.codigo && (
              <span className="form-container-group-content-span-error">
                {formik.errors.codigo}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label htmlFor="sede" className="form-container-group-content-label">
            Sede
          </label>
          <div className="mt-2">
            <select
              type="text"
              name="sede"
              id="sede"
              value={formik.values.sede}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.sede
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            >
              <option value="">[ Seleecione ]</option>
              {
                sedesCombo.map(sede => (
                  <option value={sede.sede}>{sede.sede}</option>
                ))
              }
            </select>
            {formik.errors.sede && (
              <span className="form-container-group-content-span-error">
                {formik.errors.sede}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="descripcion"
            className="form-container-group-content-label"
          >
            Descripcion
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.descripcion
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.descripcion && (
              <span className="form-container-group-content-span-error">
                {formik.errors.descripcion}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="volumenMinimo"
            className="form-container-group-content-label"
          >
            Volumen Minimo
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="volumenMinimo"
              id="volumenMinimo"
              value={formik.values.volumenMinimo}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.volumenMinimo
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.volumenMinimo && (
              <span className="form-container-group-content-span-error">
                {formik.errors.volumenMinimo}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="volumenMaximo"
            className="form-container-group-content-label"
          >
            Volumen Maximo
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="volumenMaximo"
              id="volumenMaximo"
              value={formik.values.volumenMaximo}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.volumenMaximo
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.volumenMaximo && (
              <span className="form-container-group-content-span-error">
                {formik.errors.volumenMaximo}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label htmlFor="monto" className="form-container-group-content-label">
            Monto
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="monto"
              id="monto"
              value={formik.values.monto}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.monto
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.monto && (
              <span className="form-container-group-content-span-error">
                {formik.errors.monto}
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
