import React from "react";
import { useFormik } from "formik";
import { putFetchFunction } from "../../utils/funciones";
import { API_DISTRIBUCION } from "../../utils/general";
const FormEditCargaOrdenDespachoComponent = ({
  ordenSelected,
  setOpenModal,
  setCarritoOrdenesDespacho,
}) => {
  const formik = useFormik({
    initialValues: {
      id: ordenSelected.id,
      odc_bultos: ordenSelected.odc_bultos || 0,
      odc_peso: ordenSelected.odc_peso || 0,
      odc_volumen: ordenSelected.odc_volumen || 0,
      odc_ranrec: ordenSelected.odc_ranrec || "",
    },
    validate: (values) => {
      const errors = {};
      if (!(values.odc_volumen > 0))
        errors.odc_volumen = "Debes agregar el volumen a los item";

      if (!(values.odc_bultos > 0))
        errors.odc_bultos = "Debes agregar el bulto a los item";

      if (!(values.odc_peso > 0))
        errors.odc_peso = "Debes agregar el peso a los item";

      return errors;
    },
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      ordenSelected.odc_bultos = values.odc_bultos;
      ordenSelected.odc_peso = values.odc_peso;
      ordenSelected.odc_volumen = values.odc_volumen;
      ordenSelected.odc_ranrec = values.odc_ranrec;

      const updateCarritoOD = (data) => {
        if (data.statusCode === 200) {
          let localODGroup =
            JSON.parse(localStorage.getItem("ODSAGRUPAR")) || [];

          localODGroup = localODGroup.filter((o) => o.id !== values.id);
          localODGroup.push(ordenSelected);
          setCarritoOrdenesDespacho(localODGroup);
          setOpenModal(false);
        }
      };

      putFetchFunction(
        `${API_DISTRIBUCION}/updateCargaOrdenDespacho`,
        values,
        updateCarritoOD
      );
    },
  });

  return (
    <>
      <div className="form-container text-black z-50">
        <div className="form-container-group-content">
          <input type="text" name="id" defaultValue={formik.values.id} hidden />
          <label className="form-container-group-content-label">
            Volumen (m3):
          </label>
          <div className="flex">
            <input
              type="number"
              name="odc_volumen"
              id="odc_volumen"
              value={formik.values.odc_volumen}
              onChange={formik.handleChange}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.odc_volumen
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
          </div>
          {formik.errors.odc_volumen ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.odc_volumen}
            </div>
          ) : null}
        </div>

        <div className="form-container-group-content">
          <label className="form-container-group-content-label">Bultos:</label>
          <div className="flex">
            <input
              type="number"
              value={formik.values.odc_bultos}
              onChange={formik.handleChange}
              name="odc_bultos"
              className={`form-container-group-content-input ${
                formik.errors.odc_bultos
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
          </div>
          {formik.errors.odc_bultos ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.odc_bultos}
            </div>
          ) : null}
        </div>

        <div className="form-container-group-content">
          <label className="form-container-group-content-label">Peso:</label>
          <div className="flex">
            <input
              type="number"
              value={formik.values.odc_peso}
              onChange={formik.handleChange}
              name="odc_peso"
              className={`form-container-group-content-input ${
                formik.errors.odc_peso
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
          </div>
          {formik.errors.odc_peso ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.odc_peso}
            </div>
          ) : null}
        </div>

        <div className="form-container-group-content">
          <label className="form-container-group-content-label">
            Rango de Hora:
          </label>
          <div className="flex">
            <input
              type="text"
              value={formik.values.odc_ranrec}
              onChange={formik.handleChange}
              name="odc_ranrec"
              className={`form-container-group-content-input ${
                formik.errors.odc_ranrec
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            />
          </div>
          {formik.errors.odc_ranrec ? (
            <div className="text-sm text-red-500 col-span-2 text-center">
              {formik.errors.odc_ranrec}
            </div>
          ) : null}
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
        <button
          type="submit"
          className="form-buttons-container-btnaccept"
          onClick={formik.handleSubmit}
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default FormEditCargaOrdenDespachoComponent;
