import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";

import TableCustom from "../widgets/TableComponent";
import {
  API_DISTRIBUCION,
  MANTENIMIENTO_RUTAS_DISTRITOS_TABLE_COLS_DESKTOP,
  USERNAME_LOCAL,
} from "../../utils/general";
import ComboUbigeo from "../widgets/ComboUbigeo";
import { getFetchFunction, postFetchFunction } from "../../utils/funciones";

const FormAgregarDistritosToRutaComponent = ({
  ruta,
  setOpenModal,
  setOpenMessage,
}) => {
  const [rutaDistritos, setRutasDistritos] = useState([]);
  const [distritoSelected, setDistritoSelected] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);

  const onDeleteDistrito = (distrito) => {
    //console.log("distrito to deleted",JSON.stringify(distrito));
    const newDistritos = rutaDistritos.result.filter(
      (d) => d.ubi_codubi !== distrito.ubi_codubi
    );
    console.log("newDistritos", newDistritos);
    console.log("rutaDistritos", rutaDistritos);
    setRutasDistritos({
      ...rutaDistritos,
      result: newDistritos,
    });
    setTimeout(() => {
      console.log("rutaDistritos", rutaDistritos);
    }, 200);
  };

  const onSaveListaDistritosRutas = () => {
    console.log(JSON.stringify(rutaDistritos.result, null, 2));
    const fetchRutas = async () => {
      try {
        await postFetchFunction(
          `${API_DISTRIBUCION}/saveRutaListaDistritos`,
          rutaDistritos.result,
          setOpenMessage
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchRutas();

    //setOpenModal(false)
  };

  const formik = useFormik({
    initialValues: {
      id: distritoSelected ? distritoSelected.id : 0,
      rut_codigo: ruta.rut_codigo,
      rud_indest: "01",
      rud_usuupd: USERNAME_LOCAL,
      pai_codpai: distritoSelected ? distritoSelected.pai_codpai : 0,
      ubi_codubi: distritoSelected ? distritoSelected.ubi_codubi : "0",
      ubi_desdis: distritoSelected ? distritoSelected.ubi_desdis : "",
      ubi_desprv: distritoSelected ? distritoSelected.ubi_desprv : "",
      ubi_desdep: distritoSelected ? distritoSelected.ubi_desdep : "",
    },
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      const listDistritosRutas = rutaDistritos.result;
      setRutasDistritos({
        ...rutaDistritos,
        result: [
          ...listDistritosRutas,
          {
            id: 0,
            rut_codigo: values.rut_codigo,
            ubi_codubi: values.ubi_codubi.split("|")[0],
            rud_indest: values.rud_indest,
            rud_usuupd: values.rud_usuupd,
            ubi_desdis: values.ubi_desdis,
          },
        ],
      });
      formik.setFieldValue("ubi_desdep", "");
      formik.setFieldValue("ubi_desprv", "");
      formik.setFieldValue("ubi_desdis", "");
    },
    validate: (values) => {
      const errors = {};
      if (!values.ubi_desdep) {
        errors.ubi_desdep = "Debes seleccionar un departamento";
      }
      if (!values.ubi_desprv) {
        errors.ubi_desprv = "Debes seleccionar una provincia";
      }
      if (!values.ubi_desdis) {
        errors.ubi_desdis = "Debes seleccionar un distrito";
      }
      return errors;
    },
  });

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        await getFetchFunction(
          `${API_DISTRIBUCION}/listaRutasDistritos?ruta=${ruta.rut_codigo}`,
          setLoadingTable,
          setRutasDistritos
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartamentos();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-container">
          <ComboUbigeo formik={formik}/>

          <input type="text" hidden defaultValue={formik.values.rud_indest} />
        </div>
        <div className="form-buttons-container">
          <button type="submit" className="form-buttons-container-btnaccept">
            Agregar
          </button>
        </div>
      </form>
      <TableCustom cols={MANTENIMIENTO_RUTAS_DISTRITOS_TABLE_COLS_DESKTOP}>
        {!loadingTable ? (
          rutaDistritos &&
          rutaDistritos.result.map((d) => (
            <tr key={d.ubi_codubi}>
              <td>{d.ubi_codubi}</td>
              <td>{d.ubi_desdis}</td>
              <td className="space-x-2">
                <DeleteIcon
                  className="text-red-600 cursor-pointer"
                  onClick={() => onDeleteDistrito(d)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={MANTENIMIENTO_RUTAS_DISTRITOS_TABLE_COLS_DESKTOP.length}
            >
              <CircularProgress />
            </td>
          </tr>
        )}
      </TableCustom>
      <div className="form-buttons-container">
        <button
          type="button"
          className="form-buttons-container-btncancel"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
        <button
          className="form-buttons-container-btnaccept"
          onClick={() => onSaveListaDistritosRutas()}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default FormAgregarDistritosToRutaComponent;
