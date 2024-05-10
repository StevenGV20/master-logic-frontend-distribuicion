import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TableCustom from "../widgets/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { PAGE_AGRUPAR_OD } from "../../utils/titles";
import { Checkbox, CircularProgress, MenuItem, Select } from "@mui/material";
import ModalMessage from "../widgets/ModalComponent";
import ParticionarODComponent from "../ParticionarODComponent";
import { ORDENES_DESPACHO_TABLE_COLS_DESKTOP } from "../../utils/general";
import { objOrdenesDespachoEntity } from "../../api/ordenesDespachoApi";

const ListOrdenesDespachoComponent = ({
  ordenesDespacho=objOrdenesDespachoEntity,
  setOrdenesDespacho,
  showButtonDelete,
  showPagination,
  carritoOrdenesDespacho=objOrdenesDespachoEntity.result,
  setCarritoOrdenesDespacho,
  titlePage = "",
  loadingTable,
  handleSelectRow,
  findOrdenesDespacho,
}) => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = useState(10);
  const handleChange = (event, value) => {
    setPage(value);
    findOrdenesDespacho(value, limit);
  };
  const handleChangeLimit = (e) =>{
    setLimit(e.target.value)
    findOrdenesDespacho(page, e.target.value);
  }

  const [ordenSelected, setOrdenSelected] = useState({
    canal: "",
    cliente: "",
    emisionOrden: "",
    emisionPedido: "",
  });

  const handleSelectOrden = (orden) => {
    setOrdenSelected(orden);
  };

  const handleDeletedGroup = (orden) => {
    alert(orden.grupo);
  };

  return (
    <div>
      <div className="flex space-x-4 place-items-center">
        <div>Mostrar:</div>
        <Select
          value={limit}
          id="demo-select-small"
          onChange={(e) => handleChangeLimit(e)}
         
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>
      <div className="desktop my-6">
        <TableCustom cols={ORDENES_DESPACHO_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            ordenesDespacho.result.map((orden) => (
              <tr
                className={
                  !orden.grupo && titlePage.match(PAGE_AGRUPAR_OD)
                    ? carritoOrdenesDespacho &&
                      carritoOrdenesDespacho.find((o) => o.odc_numodc === orden.odc_numodc)
                      ? "border-4 border-gray-800 bg-gray-200"
                      : "hover:bg-gray-200"
                    : ""
                }
                key={orden.odc_numodc}
              >
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.grupo ? <></> : handleSelectRow(orden))
                  }
                >
                  {orden.item}
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.grupo ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    <div>{orden.numeroPedido}</div>
                    <div>{orden.emisionPedido}</div>
                  </div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.grupo ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    <div>{orden.numeroOrdenDespacho}</div>
                  </div>
                  <div className="td-group">
                    <div>{orden.emisionOrden}</div>
                  </div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.grupo ? <></> : handleSelectRow(orden))
                  }
                >
                  {orden.canal}
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.grupo ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    <div>{orden.cliente}</div>
                    <div>{orden.direccionEntrega}</div>
                    <div>{orden.ubigeo}</div>
                  </div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.grupo ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    <div>{orden.volumen}</div>
                    <div>{orden.bultos} bultos</div>
                    <div>{orden.peso}</div>
                    <div>S/. {orden.monto && orden.monto.toFixed(2)}</div>
                  </div>
                </td>
                <td className="td-group bg-transparent text-center">
                  {orden.grupo ? (
                    <>
                      <div className="flex space-x-2 justify-center w-full">
                        <div className="">{orden.grupo} </div>
                        {showButtonDelete && (
                          <button onClick={() => handleDeletedGroup(orden)}>
                            <DeleteIcon className="text-red-600" />
                          </button>
                        )}
                      </div>
                      <div>{orden.sede}</div>
                    </>
                  ) : (
                    <div className="z-50">
                      {titlePage.match(PAGE_AGRUPAR_OD) && (
                        <ParticionarODComponent
                          handleSelectOrden={handleSelectOrden}
                          ordenRow={orden}
                          ordenSelected={ordenSelected}
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={ORDENES_DESPACHO_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>
      <div className="mobile">
        <TableCustom cols={[]}>
          {!loadingTable ? (
            ordenesDespacho.result.map((orden) => (
              <tr className="grid grid-cols-6" key={orden.odc_numodc}>
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
                        <div>S/. {orden.monto && orden.monto.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="col-span-1 grid content-center">
                  {orden.grupo ? (
                    <div className="td-group">
                      <div className="flex">
                        {orden.grupo}{" "}
                        {showButtonDelete && (
                          <button onClick={() => handleDeletedGroup(orden)}>
                            <DeleteIcon className={"text-red-700"} />
                          </button>
                        )}
                      </div>
                      <div>{orden.sede}</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <button
                          className=""
                          onClick={() =>
                            titlePage.match(PAGE_AGRUPAR_OD) &&
                            (orden.grupo ? <></> : handleSelectRow(orden))
                          }
                        >
                          <Checkbox
                            checked={
                              carritoOrdenesDespacho &&
                              carritoOrdenesDespacho.find(
                                (o) => o.item === orden.item
                              )
                                ? true
                                : false
                            }
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                          />
                        </button>
                      </div>
                      <div>
                        {titlePage.match(PAGE_AGRUPAR_OD) && (
                          <ParticionarODComponent
                            handleSelectOrden={handleSelectOrden}
                            ordenRow={orden}
                            ordenSelected={ordenSelected}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </td>
                {/* <td className="col-span-1 grid justify-items-end">
                  <ViewIcon className={"w-10 h-10 text-right"} />
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={ORDENES_DESPACHO_TABLE_COLS_DESKTOP.length}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </TableCustom>
      </div>

      {showPagination && (
        <div className="w-full flex justify-center">
          <Stack spacing={2}>
            <Pagination
              count={ordenesDespacho && Math.ceil(ordenesDespacho.result.length / limit)}
              color="primary"
              showFirstButton
              showLastButton
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      )}

      {/* <ModalMessage
        open={openModalParticionar}
        setOpen={setOpenModalParticionar}
        title={"Partcionar Ordenes de Despacho"}
        titleBtnAceptar={"Crear Orden Parcial"}
        onBtnAceptar={() => setOpenModalParticionar(false)}
      >
        <div className="modal-group-container text-black">
          <div className="modal-group-item-container">
            <label htmlFor="">Canal:</label>
            <input
              type="text"
              className="modal-group-input-md"
              value={ordenSelected.canal}
              readOnly
            />
          </div>
          <div className="modal-group-control-container w-full">
            <div className="modal-group-item-container grid-cols-4 w-full">
              <label htmlFor="" className="col-span-1">
                Cliente:
              </label>
              <input
                type="text"
                className="col-span-3 modal-group-input-md"
                value={ordenSelected.cliente}
                readOnly
              />
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">N° Pedido:</label>
              <input
                type="text"
                className="modal-group-input-md"
                value={ordenSelected.numeroPedido}
                readOnly
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Emision Pedido:</label>
              <input
                type="text"
                className="modal-group-input-md"
                value={ordenSelected.emisionPedido}
                readOnly
              />
            </div>
          </div>
          <div className="modal-group-control-container">
            <div className="modal-group-item-container">
              <label htmlFor="">N° Orden:</label>
              <input
                type="text"
                className="modal-group-input-md"
                value={ordenSelected.numeroOrdenDespacho}
                readOnly
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Emision Orden:</label>
              <input
                type="text"
                className="modal-group-input-md"
                value={ordenSelected.emisionOrdenDespacho}
                readOnly
              />
            </div>
          </div>
        </div>
      </ModalMessage> */}
    </div>
  );
};

export default ListOrdenesDespachoComponent;
