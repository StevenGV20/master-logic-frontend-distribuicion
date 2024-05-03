import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/features/combos/sedeSlice";

const FormVehiculoComponent = ({ vehiculoSelected, setOpenModal }) => {
  const formik = useFormik({
    initialValues: {
      codigo: vehiculoSelected ? vehiculoSelected.id : "",
      placa: vehiculoSelected ? vehiculoSelected.vehiculo : "",
      chofer: vehiculoSelected ? vehiculoSelected.chofer : "",
      numeroLicencia: vehiculoSelected ? vehiculoSelected.licencia : "",
      estado: vehiculoSelected ? vehiculoSelected.estado : "",
      motivo: vehiculoSelected ? vehiculoSelected.motivo : "",
      propietario: vehiculoSelected ? vehiculoSelected.propietario : "",
      sede: vehiculoSelected ? vehiculoSelected.sede : "",
      volumenMaximo: vehiculoSelected ? vehiculoSelected.volumenMaximo : "",
      tara: vehiculoSelected ? vehiculoSelected.tara : "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setOpenModal(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.placa) {
        errors.placa = "Debes ingresar la placa del vehiculo";
      }
      if (!values.chofer) {
        errors.chofer = "Debes ingresar el nombre del chofer";
      }
      if (!values.numeroLicencia) {
        errors.numeroLicencia = "Debes ingresar el numero de la licencia";
      }
      if (!values.estado) {
        errors.estado = "Debes ingresar el estado del vehiculo";
      }
      if (!values.motivo) {
        errors.motivo = "Debes ingresar el motivo";
      }
      if (!values.propietario) {
        errors.propietario = "Debes ingresar el propietario del vehiculo";
      }
      if (!values.sede) {
        errors.sede = "Debes ingresar la sede del vehiculo";
      }
      if (!values.volumenMaximo) {
        errors.volumenMaximo = "Debes ingresar el volumen maximo del vehiculo";
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
        <input type="text" hidden name="codigo" value={formik.values.codigo} />
        <div className="form-container-group-content">
          <label htmlFor="placa" className="form-container-group-content-label">
            Placa
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="placa"
              id="idPlaca"
              value={formik.values.placa}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.placa
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.placa && (
              <span className="form-container-group-content-span-error">
                {formik.errors.placa}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="chofer"
            className="form-container-group-content-label"
          >
            Chofer
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="chofer"
              id="idChofer"
              value={formik.values.chofer}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.chofer
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.chofer && (
              <span className="form-container-group-content-span-error">
                {formik.errors.chofer}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="chofer"
            className="form-container-group-content-label"
          >
            Numero de Licencia
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="numeroLicencia"
              id="numeroLicencia"
              value={formik.values.numeroLicencia}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.numeroLicencia
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.numeroLicencia && (
              <span className="form-container-group-content-span-error">
                {formik.errors.numeroLicencia}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="estado"
            className="form-container-group-content-label"
          >
            Estado
          </label>
          <div className="mt-2">
            <select
              type="text"
              name="estado"
              id="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.estado
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            >
              <option value="">[ Seleecione ]</option>
              <option value="A">ACTIVO</option>
              <option value="I">INACTIVO</option>
            </select>
            {formik.errors.estado && (
              <span className="form-container-group-content-span-error">
                {formik.errors.estado}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="motivo"
            className="form-container-group-content-label"
          >
            Motivo
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="motivo"
              id="motivo"
              value={formik.values.motivo}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.motivo
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.motivo && (
              <span className="form-container-group-content-span-error">
                {formik.errors.motivo}
              </span>
            )}
          </div>
        </div>
        <div className="form-container-group-content">
          <label
            htmlFor="propietario"
            className="form-container-group-content-label"
          >
            Propietario
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="propietario"
              id="propietario"
              value={formik.values.propietario}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.propietario
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
            {formik.errors.propietario && (
              <span className="form-container-group-content-span-error">
                {formik.errors.propietario}
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
              {sedesCombo.map((sede) => (
                <option value={sede.sede}>{sede.sede}</option>
              ))}
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
          <label htmlFor="tara" className="form-container-group-content-label">
            Tara
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="tara"
              id="tara"
              value={formik.values.tara}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className="form-container-group-content-input"
            />
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

export default FormVehiculoComponent;
