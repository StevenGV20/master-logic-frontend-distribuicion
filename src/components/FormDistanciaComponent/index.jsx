import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/features/combos/sedeSlice";

const FormDistanciaComponent = ({
    distanciaSelected,
  setDistanciaSelected,
  setOpenModal,
}) => {
  const formik = useFormik({
    initialValues: {
      sede: distanciaSelected ? distanciaSelected.sede : "",
      distrito: distanciaSelected ? distanciaSelected.distrito : "",
      kilometros: distanciaSelected ? distanciaSelected.kilometros : "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setOpenModal(false);
      setDistanciaSelected(null);
    },
    validate: (values) => {
      const errors = {};
      if (!values.sede) {
        errors.sede = "Debes seleccionar una sede";
      }
      if (!values.distrito) {
        errors.distrito = "Debes ingresar un distrito";
      }
      if (!values.kilometros) {
        errors.kilometros = "Debes ingresar los kilometros";
      }
      return errors;
    },
  });

  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  useEffect(() => {    
    console.log("sedesCombo", sedesCombo);
    if (!(sedesCombo.length > 0)) dispatch(fetchData());
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <div className="form-container-group-content">
          <label
            htmlFor="sede"
            className="form-container-group-content-label"
          >
            Codigo de Ruta
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
            htmlFor="distrito"
            className="form-container-group-content-label"
          >
            Distrito
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="distrito"
              id="distrito"
              value={formik.values.distrito}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.distrito
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.distrito && (
              <span className="form-container-group-content-span-error">
                {formik.errors.distrito}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="kilometros"
            className="form-container-group-content-label"
          >
            Kilometros
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="kilometros"
              id="kilometros"
              value={formik.values.kilometros}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.kilometros
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.kilometros && (
              <span className="form-container-group-content-span-error">
                {formik.errors.kilometros}
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

export default FormDistanciaComponent;
