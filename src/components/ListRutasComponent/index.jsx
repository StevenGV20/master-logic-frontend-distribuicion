import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import TableCustom from "../widgets/TableComponent";
import {
  MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_RUTAS_TABLE_COLS_MOBILE,
} from "../../utils/general";
import { fetchData } from "../../redux/features/combos/sedeSlice";

const ListRutasComponent = ({
  loadingTable,
  rutas,
  handleSelectedRuta,
  handleSelectedDeleteRuta,
  handleSelectedRutaToDistrito,
}) => {
  const sedesCombo = useSelector((state) => state.sede.lista);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("sedesCombo", sedesCombo);
    if (!(sedesCombo.length > 0)) {
      dispatch(fetchData());
    }
  }, []);

  return (
    <>
      <div className="desktop">
        <TableCustom cols={MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            rutas &&
            rutas.result.map((ruta) => (
              <tr key={ruta.id}>
                <td>{ruta.rut_codigo}</td>
                <td>
                  {sedesCombo && sedesCombo.length > 0
                    ? sedesCombo.find((s) => s.sed_codsed === ruta.sed_codsed)
                        .sed_descor
                    : ruta.sed_codsed}
                </td>
                <td>{ruta.rut_descripcion}</td>
                <td>{ruta.rut_volmin}</td>
                <td>{ruta.rut_volmax}</td>
                <td>{ruta.rut_precio}</td>
                <td>
                  <Tooltip title="Agregar Distrito" sx={{ fontSize: "16px" }}>
                    <IconButton
                      onClick={() => handleSelectedRutaToDistrito(ruta)}
                    >
                      <AddCircleIcon className="text-green-600 scale-110" />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="space-x-2">
                  {/* <button
                    className="react-btn-base"
                    onClick={() => handleSelectedRutaToDistrito(ruta)}
                  >
                    Agregar Distritos
                  </button> */}
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <EditIcon
                      className="text-gray-700 cursor-pointer"
                      onClick={() => handleSelectedRuta(ruta)}
                    />
                    <DeleteIcon
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleSelectedDeleteRuta(ruta)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>

      <div className="mobile">
        <TableCustom cols={MANTENIMIENTO_RUTAS_TABLE_COLS_MOBILE}>
          {!loadingTable ? (
            rutas &&
            rutas.result.map((ruta) => (
              <tr key={ruta.id + "-mobile"}>
                <td>
                  <div>{ruta.rut_codigo}</div>
                  <div>
                    {sedesCombo && sedesCombo.length > 0
                      ? sedesCombo.find((s) => s.sed_codsed === ruta.sed_codsed)
                          .sed_descor
                      : ruta.sed_codsed}
                  </div>
                  <div>{ruta.rut_descripcion}</div>
                  <div>{ruta.rut_volmin}</div>
                  <div>{ruta.rut_volmax}</div>
                  <div>{ruta.rut_precio}</div>
                </td>
                <td className="lg:space-x-2">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {
                      <Tooltip
                        title="Agregar Distrito"
                        sx={{ fontSize: "16px" }}
                      >
                        <IconButton
                          onClick={() => handleSelectedRutaToDistrito(ruta)}
                        >
                          <div>
                            <AddCircleIcon className="text-green-600 scale-110" />
                            <div className="font-bold">Distritos</div>
                          </div>
                        </IconButton>
                      </Tooltip>
                    }
                    <IconButton>
                      <EditIcon
                        className="text-gray-700 cursor-pointer"
                        onClick={() => handleSelectedRuta(ruta)}
                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleSelectedDeleteRuta(ruta)}
                      />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={MANTENIMIENTO_RUTAS_TABLE_COLS_MOBILE.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>
    </>
  );
};

export default ListRutasComponent;
