import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { putFetchFunction, getFetchFunction } from "../../utils/funciones";
import {
  API_DISTRIBUCION,
  API_MAESTRO,
  LUGARES_DESPACHO_TABLE_COLS_DESKTOP,
  LUGARES_DESPACHO_TABLE_COLS_MOBILE,
} from "../../utils/general";
import CustomTablePagination from "../widgets/TableComponent/TablePagination";
import { CircularProgress, TableCell, TableRow } from "@mui/material";

const FormEditarLugarDespachoComponent = ({
  ordenSelected,
  setOpenModal,
  setCarritoOrdenesDespacho,
}) => {
  const formik = useFormik({
    initialValues: {
      id: ordenSelected.id,
      lugcod: ordenSelected.lugcod || "",
      dirdes: ordenSelected.dirdes || "",
      ubigeo: ordenSelected.ubigeo || "",
      departamento: "",
      provincia: "",
      ubi_desprv: "",
    },
    validate: (values) => {
      const errors = {};
      if (!lugaresDespachoSelected.lug_cod)
        errors.lugcod = "Debes elegir un lugar de despacho";

      return errors;
    },
    onSubmit: (values) => {
      ordenSelected.odc_desubigeo =
      lugaresDespachoSelected.ubi_desdep + "," + lugaresDespachoSelected.ubi_desprv + "," + lugaresDespachoSelected.ubi_desdis;

      delete formik.values.departamento;
      delete formik.values.provincia;
      delete formik.values.ubi_desprv

      const updateCarritoOD = (data) => {
        if (data.statusCode === 200) {
          let localODGroup =
            JSON.parse(localStorage.getItem("ODSAGRUPAR")) || [];

          localODGroup = localODGroup.filter((o) => o.id !== values.id);
          ordenSelected.odc_lugcod = values.lugcod;
          ordenSelected.odc_dirdes = values.dirdes;
          ordenSelected.odc_ubigeo = values.ubigeo;
          localODGroup.push(ordenSelected);
          setCarritoOrdenesDespacho(localODGroup);
          setOpenModal(false);
        }
      };

      putFetchFunction(
        `${API_DISTRIBUCION}/ordenDespacho/updateLugarDespacho`,
        values,
        updateCarritoOD
      );
    },
  });

  const [lugaresDespacho, setLugaresDespacho] = useState([]);
  const [lugaresDespachoFilter, setLugaresDespachoFilter] = useState([]);
  const [loadingLugaresDespacho, setLoadingLugaresDespacho] = useState(true);
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [loadingDepartaments, setLoadingDepartaments] = useState(true);
  const [loadingProvincias, setLoadingProvincias] = useState(true);
  const [loadingDistritos, setLoadingDistritos] = useState(true);

  const [lugaresDespachoSelected, setLugaresDespachoSelected] = useState({
    lug_cod: ordenSelected.odc_lugcod,
  });

  useEffect(() => {
    const updateData = (data) => {
      setLugaresDespacho(data);
      setLugaresDespachoFilter(data);
      const departamentsGroup = Object.groupBy(
        data.result,
        ({ ubi_desdep }) => ubi_desdep
      );
      let departments = [];
      for (const departamento in departamentsGroup) {
        departments.push(departamento);
      }
      setLoadingDepartaments(false);
      setDepartamentos(departments);
    };

    getFetchFunction(
      `${API_MAESTRO}/lugaresDespacho/lista?cliente=${ordenSelected.aux_codaux}`,
      setLoadingLugaresDespacho,
      updateData
    );
  }, []);

  const handleSelectedDepartamento = (e) => {
    const departamento = e.target.value;
    formik.setFieldValue("departamento", departamento);
    const provincias = lugaresDespacho.result.filter(
      (l) => l.ubi_desdep === departamento
    );

    const provinciasGroup = Object.groupBy(
      provincias,
      ({ ubi_desprv }) => ubi_desprv
    );
    let provinciasArray = [];

    for (const departamento in provinciasGroup) {
      provinciasArray.push(departamento);
    }
    setLoadingProvincias(false);
    setProvincias(provinciasArray);
    setDistritos([]);
  };

  const handleSelectedProvincias = (e) => {
    const provincia = e.target.value;
    formik.setFieldValue("provincia", provincia);

    const distritos = lugaresDespacho.result.filter(
      (l) => l.ubi_desprv.trim() === provincia
    );

    const distritosGroup = Object.groupBy(
      distritos,
      ({ ubi_desdis }) => ubi_desdis
    );
    let distritosArray = [];

    for (const dis in distritosGroup) {
      distritosArray.push(dis);
    }

    console.log(distritosArray);

    setLoadingDistritos(false);
    setDistritos(distritosArray);
  };

  const handleSelectedDistrito = (e) => {
    //setDistritoSelected(distrito);
    const distrito = e.target.value;
    formik.setFieldValue("ubi_desdis", distrito.split("|")[1]);

    const lugaresFilter = lugaresDespacho.result.filter(
      (l) => l.ubi_desdis === distrito
    );

    setLoadingLugaresDespacho(true);
    setTimeout(() => {
      setLugaresDespachoFilter({ result: lugaresFilter });
      setLoadingLugaresDespacho(false);
    }, 500);
  };

  const handleSelectLugar = (lugar) => {
    setLugaresDespachoSelected(lugar);
    formik.setFieldValue("lugcod", lugar.lug_cod);
    formik.setFieldValue("dirdes", lugar.lug_dir);
    formik.setFieldValue("ubigeo", lugar.lug_ubi);
  };

  const rowTableDesktop = (row) => {
    return (
      <TableRow
        key={row.lug_cod}
        className={`${
          lugaresDespachoSelected.lug_cod === row.lug_cod
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
        onClick={() => handleSelectLugar(row)}
      >
        <TableCell component="th" scope="row">
          {row.lug_dir}
        </TableCell>
        <TableCell style={{ width: 160 }} align="center">
          {row.ubi_desdep}
        </TableCell>
        <TableCell style={{ width: 160 }} align="center">
          {row.ubi_desprv}
        </TableCell>
        <TableCell style={{ width: 160 }} align="center">
          {row.ubi_desdis}
        </TableCell>
      </TableRow>
    );
  };

  const rowTableMobile = (row) => {
    return (
      <TableRow key={row.lug_cod}>
        <TableCell style={{ width: 160 }} align="left">
          <div>{row.lug_dir}</div>
          <div>
            {row.ubi_desdep}, {row.ubi_desprv}, {row.ubi_desdis}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <div className="form-container text-black z-50">
        <div className="form-container-group-content">
          <label
            htmlFor="ubi_desdep"
            className="form-container-group-content-label"
          >
            Departamento
          </label>
          <div className="mt-2">
            <select
              type="text"
              name="ubi_desdep"
              id="ubi_desdep"
              value={formik.values.ubi_desdep}
              onChange={(e) => handleSelectedDepartamento(e)}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors.ubi_desdep
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            >
              <option value="">[Seleccione ]</option>
              {!loadingDepartaments &&
                departamentos.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            {formik.errors.ubi_desdep && (
              <span className="form-container-group-content-span-error">
                {formik.errors.ubi_desdep}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="ubi_desprv"
            className="form-container-group-content-label"
          >
            Provincia
          </label>
          <div className="mt-2">
            <select
              type="text"
              name="ubi_desprv"
              id="ubi_desprv"
              value={formik.values.ubi_desprv}
              onChange={(e) => handleSelectedProvincias(e)}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors && formik.errors.ubi_desprv
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            >
              <option value="">[Seleccione ]</option>
              {!loadingProvincias &&
                provincias.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
            </select>
            {formik.errors && formik.errors.ubi_desprv && (
              <span className="form-container-group-content-span-error">
                {formik.errors.ubi_desprv}
              </span>
            )}
          </div>
        </div>

        <div className="form-container-group-content">
          <label
            htmlFor="ubi_desdis"
            className="form-container-group-content-label"
          >
            Distrito
          </label>
          <div className="mt-2">
            <select
              type="text"
              name="ubi_desdis"
              id="ubi_desdis"
              value={formik.values.ubi_desdis}
              onChange={(e) => handleSelectedDistrito(e)}
              autoComplete="given-name"
              className={`form-container-group-content-input ${
                formik.errors && formik.errors.ubi_desdis
                  ? "form-container-group-content-input-error"
                  : ""
              }`}
            >
              <option value={-1}>[Seleccione ]</option>
              {!loadingDistritos &&
                distritos.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            {formik.errors && formik.errors.ubi_desdis && (
              <span className="form-container-group-content-span-error">
                {formik.errors.ubi_desdis}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full text-center items-center">
        {formik.errors.lugcod && (
          <span className="form-container-group-content-span-error">
            {formik.errors.lugcod}
          </span>
        )}
      </div>
      <div className="w-full desktop">
        {!loadingLugaresDespacho ? (
          <CustomTablePagination
            rowTableComponent={rowTableDesktop}
            rows={lugaresDespachoFilter.result.sort((a, b) =>
              a.lug_cod.localeCompare(b.lug_cod)
            )}
            loadingTable={loadingLugaresDespacho}
            columns={LUGARES_DESPACHO_TABLE_COLS_DESKTOP}
          ></CustomTablePagination>
        ) : (
          <div className="text-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>

      <div className="w-full mobile">
        {!loadingLugaresDespacho ? (
          <CustomTablePagination
            rowTableComponent={rowTableMobile}
            rows={lugaresDespachoFilter.result.sort((a, b) =>
              a.lug_cod.localeCompare(b.lug_cod)
            )}
            loadingTable={loadingLugaresDespacho}
            columns={LUGARES_DESPACHO_TABLE_COLS_MOBILE}
          ></CustomTablePagination>
        ) : (
          <>
            <CircularProgress />
          </>
        )}
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

export default FormEditarLugarDespachoComponent;
