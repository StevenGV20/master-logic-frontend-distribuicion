import React, { useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import {
  Checkbox,
  CircularProgress,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TableCustom from "../widgets/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { PAGE_AGRUPAR_OD } from "../../utils/titles";
import ModalMessage from "../widgets/ModalComponent";
import ParticionarODComponent from "../ParticionarODComponent";
import {
  ORDENES_DESPACHO_TABLE_COLS_DESKTOP,
  PEN_CURRENCY,
  USERNAME_LOCAL,
} from "../../utils/general";
import { objOrdenesDespachoEntity } from "../../api/ordenesDespachoApi";
import { convertirDateTimeToDate } from "../../utils/funciones";
import BasicPopover from "../widgets/PopoverCustom";
import FormEditCargaOrdenDespachoComponent from "../FormEditCargaOrdenDespachoComponent";

const ListOrdenesDespachoComponent = ({
  ordenesDespacho = objOrdenesDespachoEntity,
  setOrdenesDespacho,
  showButtonDelete,
  showPagination,
  carritoOrdenesDespacho = objOrdenesDespachoEntity.result,
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
  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
    findOrdenesDespacho(page, e.target.value);
  };

  const [ordenSelected, setOrdenSelected] = useState(null);

  const handleSelectOrden = (orden) => {
    setOrdenSelected(orden);
  };

  const handleDeletedGroup = (orden) => {
    
    alert(orden.gru_grucod);

  };

  const userLocal = localStorage.getItem("USERNAME");

  const [openEditOrden, setOpenEditOrden] = useState(false);

  return (
    <div>
      <ModalMessage
        open={openEditOrden}
        setOpen={setOpenEditOrden}
        title={"Editar Carga de la Orden de Despacho"}
        titleBtnAceptar={""}
        showButtons={false}
        onBtnAceptar={() => setOpenEditOrden(false)}
      >
        <FormEditCargaOrdenDespachoComponent
          ordenSelected={ordenSelected}
          setOpenModal={setOpenEditOrden}
          setCarritoOrdenesDespacho={setCarritoOrdenesDespacho}
        />
      </ModalMessage>

      <div className="desktop my-6">
        <TableCustom cols={ORDENES_DESPACHO_TABLE_COLS_DESKTOP}>
          {!loadingTable ? (
            ordenesDespacho &&
            ordenesDespacho.result.map((orden) => (
              <tr
                className={
                  !orden.gru_grucod && titlePage.match(PAGE_AGRUPAR_OD)
                    ? orden.odc_estado === "2" && orden.odc_selusu === userLocal
                      ? "border-4 border-gray-800 bg-gray-200"
                      : orden.odc_estado === "2" &&
                        orden.odc_selusu !== userLocal
                      ? "bg-gray-200 text-gray-400"
                      : "hover:bg-gray-200"
                    : ""
                }
                key={orden.id}
              >
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    <div>{orden.odc_numodc}</div>
                  </div>
                  <div className="td-group">
                    <div>
                      {orden.odc_fecdoc &&
                        convertirDateTimeToDate(orden.odc_fecdoc)}
                    </div>
                  </div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    <div>{orden.ppc_numppc}</div>
                  </div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  {orden.odc_obsodc}
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div className="td-group">
                    {/* <div><label htmlFor="">Almacen: </label>{orden.alm_codalm}</div>
                    <div>{orden.pro_codpro}</div>
                    <div>{orden.alm_codtra}</div> */}
                    <div>{orden.aux_nomaux}</div>
                  </div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  {orden.odc_volumen}
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  {orden.odc_bultos}
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  {orden.odc_peso}
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div>{orden.odc_imptot}</div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div>{orden.odc_ubigeo}</div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div>{orden.odc_dirdes}</div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div>{orden.odc_distancia}</div>
                </td>
                <td
                  onClick={() =>
                    titlePage.match(PAGE_AGRUPAR_OD) &&
                    (orden.gru_grucod ? <></> : handleSelectRow(orden))
                  }
                >
                  <div>{orden.odc_ranrec}</div>
                </td>
                <td className="td-group bg-transparent text-center">
                  {orden.gru_grucod ? (
                    <>
                      <div className="flex space-x-2 justify-center w-full">
                        <div className="">{orden.gru_grucod} </div>
                        {showButtonDelete && (
                          <button onClick={() => handleDeletedGroup(orden)}>
                            <DeleteIcon className="text-red-600" />
                          </button>
                        )}
                      </div>
                      <div>{orden.sede}</div>
                    </>
                  ) : (
                    <div className="z-10">
                      {titlePage.match(PAGE_AGRUPAR_OD) && (
                        <>
                          {((orden.odc_estado === "2" &&
                            orden.odc_selusu === userLocal) ||
                            orden.odc_estado === "1") && (
                            <BasicPopover isClose={openEditOrden}>
                              <ParticionarODComponent
                                handleSelectOrden={handleSelectOrden}
                                ordenRow={orden}
                                ordenSelected={ordenSelected}
                              />
                              {carritoOrdenesDespacho &&
                                carritoOrdenesDespacho.find(
                                  (o) => o.odc_numodc === orden.odc_numodc
                                ) && (
                                  <>
                                    <button
                                      className="flex row-span-2 space-x-2"
                                      onClick={() => {
                                        handleSelectOrden(orden);
                                        setOpenEditOrden(true);
                                      }}
                                    >
                                      <span className="text-black font-bold px-4 py-2">
                                        Editar Carga
                                      </span>
                                      <EditIcon className="text-gray-500 text-center" />
                                    </button>
                                  </>
                                )}
                            </BasicPopover>
                          )}
                        </>
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
              <tr className="grid grid-cols-6" key={orden.id}>
                <td className="col-span-5">
                  <div className="td-group-mobile">
                    <label className="w-full text-left">
                      {orden.odc_numodc}
                    </label>
                    <div>
                      <label>Pedido:</label>
                      <div className="flex space-x-4">
                        <div>{orden.ppc_numppc}</div>
                        <div>{orden.emisionPedido}</div>
                      </div>
                    </div>
                    <div>
                      <label>Orden de Despacho:</label>
                      <div className="flex space-x-4">
                        <div>{orden.odc_numodc}</div>
                        <div>{orden.odc_fecdoc}</div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Canal:</label> {orden.canal}
                    </div>
                    <div>
                      <label>Cliente:</label>
                      <div>{orden.aux_nomaux}</div>
                      <div>{orden.direccionEntrega}</div>
                      <div>{orden.ubigeo}</div>
                    </div>
                    <div className="block space-x-3">
                      <label>Carga:</label>
                      <div className="grid grid-cols-2">
                        <div>{orden.odc_volumen} m3</div>
                        <div>{orden.odc_bultos} bultos</div>
                        <div>{orden.odc_peso} tn</div>
                        <div>
                          {PEN_CURRENCY}{" "}
                          {orden.odc_imptot && orden.odc_imptot.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="col-span-1 grid content-center">
                  {orden.gru_grucod ? (
                    <div className="td-group">
                      <div className="flex">
                        {orden.gru_grucod}{" "}
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
                            (orden.gru_grucod ? <></> : handleSelectRow(orden))
                          }
                        >
                          <Checkbox
                            checked={
                              carritoOrdenesDespacho &&
                              carritoOrdenesDespacho.find(
                                (o) => o.odc_numodc === orden.odc_numodc
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
                          <>
                            <BasicPopover>
                              <ParticionarODComponent
                                handleSelectOrden={handleSelectOrden}
                                ordenRow={orden}
                                ordenSelected={ordenSelected}
                              />
                              {carritoOrdenesDespacho &&
                                carritoOrdenesDespacho.find(
                                  (o) => o.odc_numodc === orden.odc_numodc
                                ) && (
                                  <>
                                    <button className="flex row-span-2 space-x-2">
                                      <span className="text-black font-bold px-4 py-2">
                                        Editar Carga
                                      </span>
                                      <EditIcon className="text-gray-500 text-center" />
                                    </button>
                                  </>
                                )}
                            </BasicPopover>
                          </>
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
              count={
                ordenesDespacho &&
                Math.ceil(ordenesDespacho.result.length / limit)
              }
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
