import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ordenesDespachoFake } from "../../data/ordenesDespachoFake";
import { TrashIcon, ViewIcon } from "../../icons/icons-svg";
import Table from "../TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { PAGE_AGRUPAR_OD } from "../../utils/titles";
import { CircularProgress } from "@mui/material";

const ListOrdenesDespachoComponent = ({
  ordenesDespacho,
  setOrdenesDespacho,
  showButtonDelete,
  showPagination,
  carritoOrdenesDespacho,
  setCarritoOrdenesDespacho,
  titlePage = "",
  loadingTable,
}) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const cols_desktop = [
    "Item",
    "Pedido",
    "Ord. Despacho",
    "Canal",
    "Cliente",
    "Carga",
    "GRUPO",
    "",
  ];

  const handleSelectRow = async (orden) => {
    const od = carritoOrdenesDespacho.find((o) => o.item == orden.item);
    if (!od)
      await setCarritoOrdenesDespacho([...carritoOrdenesDespacho, orden]);
    console.log("row selected", orden);
    console.log("...carritoOrdenesDespacho,orden", carritoOrdenesDespacho);
  };

  const handleDeletedGroup = (orden) => {
    console.log("group deleted", orden.grupo);
  };
  return (
    <div>
      <div className="desktop my-6">
        <Table cols={cols_desktop}>
          {!loadingTable ? (
            ordenesDespacho.map((orden) => (
              <tr
                onClick={() =>
                  titlePage.match(PAGE_AGRUPAR_OD) &&
                  (orden.grupo ? <></> : handleSelectRow(orden))
                }
                className={
                  titlePage.match(PAGE_AGRUPAR_OD) &&
                  (carritoOrdenesDespacho &&
                  carritoOrdenesDespacho.find((o) => o.item == orden.item)
                    ? "ring-2 ring-sky-400 border-4 border-sky-600"
                    : "ring-0")
                }
                key={orden.item}
              >
                <td>{orden.item}</td>
                <td>
                  <div className="td-group">
                    <div>{orden.numeroPedido}</div>
                    <div>{orden.emisionPedido}</div>
                  </div>
                </td>
                <td>
                  <div className="td-group">
                    <div>{orden.numeroOrdenDespacho}</div>
                  </div>
                  <div className="td-group">
                    <div>{orden.emisionOrdenDespacho}</div>
                  </div>
                </td>
                <td>{orden.canal}</td>
                <td>
                  <div className="td-group">
                    <div>{orden.cliente}</div>
                    <div>{orden.direccionEntrega}</div>
                    <div>{orden.ubigeo}</div>
                  </div>
                </td>
                <td>
                  <div className="td-group">
                    <div>{orden.volumen}</div>
                    <div>{orden.bultos} bultos</div>
                    <div>{orden.peso}</div>
                    <div>S/. {orden.monto}</div>
                  </div>
                </td>
                {orden.grupo && (
                  <td className="td-group">
                    <div className="flex space-x-2">
                      <div>{orden.grupo} </div>
                      {showButtonDelete && (
                        <button
                          onClick={() => handleDeletedGroup(orden)}
                          className="z-50"
                        >
                          <DeleteIcon className="text-red-600" />
                        </button>
                      )}
                    </div>
                    <div>{orden.sede}</div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <td colSpan={cols_desktop.length}>
              <CircularProgress />
            </td>
          )}
        </Table>
      </div>
      <div className="mobile">
        <Table cols={[]}>
          {!loadingTable ? (
            ordenesDespacho.map((orden) => (
              <tr className="grid grid-cols-6" key={orden.item}>
                <td className="col-span-4">
                  <div className="td-group-mobile">
                    <label className="w-full text-left">{orden.item}</label>
                    <div>
                      <label>Pedido:</label>
                      <div className="flex space-x-4">
                        <div>{orden.numeroPedido}</div>
                        <div>{orden.emisionPedido}</div>
                      </div>
                    </div>
                    <div>
                      <label>Orden de Despacho:</label>
                      <div className="flex space-x-4">
                        <div>{orden.numeroOrdenDespacho}</div>
                        <div>{orden.emisionOrdenDespacho}</div>
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
                        <div>S/. {orden.monto}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="col-span-1 grid content-center">
                  {orden.grupo && (
                    <div className="td-group">
                      <div className="flex">
                        {orden.grupo}{" "}
                        {showButtonDelete && (
                          <button>
                            <TrashIcon className={"text-red-700"} />
                          </button>
                        )}
                      </div>
                      <div>{orden.sede}</div>
                    </div>
                  )}
                </td>
                {/* <td className="col-span-1 grid justify-items-end">
                  <ViewIcon className={"w-10 h-10 text-right"} />
                </td> */}
              </tr>
            ))
          ) : (
            <td colSpan={cols_desktop.length}>
              <CircularProgress />
            </td>
          )}
        </Table>
      </div>

      {showPagination && (
        <div className="w-full flex justify-center">
          <Stack spacing={2}>
            <Pagination
              count={10}
              color="primary"
              showFirstButton
              showLastButton
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default ListOrdenesDespachoComponent;
