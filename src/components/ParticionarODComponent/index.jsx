import React, { useEffect, useState } from "react";
import ModalMessage from "../widgets/ModalComponent";
import TableCheckbox from "../widgets/TableComponent/TableCheckbox";
import {
  CircularProgress,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";
import CustomTablePagination from "../widgets/TableComponent/TablePagination";
import {
  API_DISTRIBUCION,
  ORDENES_DESPACHO_PARTITION_TABLE_COLS_DESKTOP,
} from "../../utils/general";
import { ordenDespachoItems } from "../../api/ordenDespachoItems";
import {
  convertirDateTimeToDate,
  getFetchFunction,
  postFetchFunction,
  redondearDecimales,
} from "../../utils/funciones";
import AlertMessage from "../widgets/AlertMessage";
import { IconDivide } from "../../icons/icons-svg";

const ParticionarODComponent = ({ ordenRow }) => {
  const [openModalParticionar, setOpenModalParticionar] = useState(false);
  const [ordenDespacho, setOrdenDespacho] = useState(null);
  const [errorItem, setErrorItem] = useState({ id: "", message: "" });
  const [loadingTable, setLoadingTable] = useState(true);
  const [isOrdenSelected, setIsOrdenSelected] = useState(false);

  const [openMessage, setOpenMessage] = useState({
    state: false,
    type: "",
    message: "",
  });
  /* const [ordenDespachoEditada, setOrdenDespachoEditada] = useState(null);
  const [ordenDespachoNueva, setOrdenDespachoNueva] = useState(null); */

  useEffect(() => {
    //findOrdenesDespacho('01', ordenSelected.odc_numodc);
  }, []);

  const findOrdenesDespacho = (cia, numodc) => {
    const fetchOrdenesDespacho = async () => {
      try {
        await getFetchFunction(
          `${API_DISTRIBUCION}/findDistribucionOrdenDespacho?cia=${cia}&numodc=${numodc}`,
          setLoadingTable,
          setOrdenDespacho
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenesDespacho();
  };

  const handleSelectOrdenDetails = (ordenRow) => {
    setIsOrdenSelected(true);
    findOrdenesDespacho("01", ordenRow.odc_numodc);
  };

  const onChangeCantidad = (item, e) => {
    if (e.target.value > item.odd_canaut) {
      setErrorItem({
        id: item.prd_codprd,
        message: "La cantidad no puede ser mayor a la cantidad original",
      });
    } else if (e.target.value < 0) {
      setErrorItem({
        id: item.prd_codprd,
        message: "La cantidad no puede ser menor a 0",
      });
    } else {
      setErrorItem({ id: "", message: "" });
      let otrosItems = ordenDespacho.result.items.filter(
        (i) => i.prd_codprd !== item.prd_codprd
      );
      let thisItem = ordenDespacho.result.items.find(
        (i) => i.prd_codprd.trim() === item.prd_codprd.trim()
      );

      thisItem["cantidadReducida"] = thisItem.odd_canaut - e.target.value;
      thisItem["cantidadParticionada"] = e.target.value;
      otrosItems = {
        ...ordenDespacho,
        result: { ...ordenDespacho.result, items: [thisItem, ...otrosItems] },
      };
      otrosItems.result.items.sort((a, b) =>
        a.prd_codprd.localeCompare(b.prd_codprd)
      );
      setOrdenDespacho(otrosItems);
    }
  };

  const rowTable = (row) => (
    <TableRow key={row.prd_codprd}>
      <TableCell component="th" scope="row">
        {row.prd_codprd}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.prd_desesp}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.odd_canaut}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.cantidadReducida >= 0
          ? row.cantidadReducida
          : (row["cantidadReducida"] = row.odd_canaut)}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        <input
          type="number"
          value={
            row.cantidadParticionada
              ? row.cantidadParticionada
              : (row["cantidadParticionada"] = 0)
          }
          className="text-center form-container-group-content-input px-2"
          id={"prd" + row.prd_codprd}
          onChange={(e) => onChangeCantidad(row, e)}
        />
        {errorItem.id === row.prd_codprd && (
          <span className="form-container-group-content-span-error">
            {errorItem.message}
          </span>
        )}
      </TableCell>
    </TableRow>
  );

  const updateOrderItem = (ordenDespachoItemEdit, item, cantidad) => {
    ordenDespachoItemEdit.odd_canaut = parseFloat(cantidad);
    ordenDespachoItemEdit.odd_candes = parseFloat(cantidad);

    ordenDespachoItemEdit.odd_impbru = parseFloat(
      redondearDecimales(cantidad * item.odd_preuni).toFixed(2)
    );

    ordenDespachoItemEdit.odd_imptot = ordenDespachoItemEdit.odd_impbru;

    ordenDespachoItemEdit.odd_impde1 = redondearDecimales(
      (ordenDespachoItemEdit.odd_imptot * ordenDespachoItemEdit.odd_porde1) /
        100
    );
    ordenDespachoItemEdit.odd_imptot = redondearDecimales(
      ordenDespachoItemEdit.odd_imptot - ordenDespachoItemEdit.odd_impde1
    );

    ordenDespachoItemEdit.odd_impde2 = redondearDecimales(
      (ordenDespachoItemEdit.odd_imptot * ordenDespachoItemEdit.odd_porde2) /
        100
    );
    ordenDespachoItemEdit.odd_imptot = redondearDecimales(
      ordenDespachoItemEdit.odd_imptot - ordenDespachoItemEdit.odd_impde2
    );

    ordenDespachoItemEdit.odd_impde3 = redondearDecimales(
      (ordenDespachoItemEdit.odd_imptot * ordenDespachoItemEdit.odd_porde3) /
        100
    );
    ordenDespachoItemEdit.odd_imptot = redondearDecimales(
      ordenDespachoItemEdit.odd_imptot - ordenDespachoItemEdit.odd_impde3
    );

    ordenDespachoItemEdit.odd_impigv = parseFloat(
      (
        (ordenDespachoItemEdit.odd_imptot *
          parseFloat(ordenDespacho.result.odc_tasigv)) /
        100
      ).toFixed(2)
    );
    ordenDespachoItemEdit.odd_imptot = parseFloat(
      (
        ordenDespachoItemEdit.odd_imptot + ordenDespachoItemEdit.odd_impigv
      ).toFixed(2)
    );

    return ordenDespachoItemEdit;
  };

  const onSubmitOrdenParcial = () => {
    let sumaCantidadOriginal = 0;
    let sumaCantidadParticionada = 0;
    for (let item of ordenDespacho.result.items) {
      sumaCantidadOriginal += parseFloat(item.cantidadReducida);
      sumaCantidadParticionada += parseFloat(item.cantidadParticionada);
    }

    if (sumaCantidadOriginal === 0) {
      setErrorItem({
        id: "SUBMIT",
        message: "La cantidad original en todos los items no puede quedar en 0",
      });
      setOpenMessage({ state: true, type: "error", message: "Error" });
    } else if (sumaCantidadParticionada === 0) {
      setErrorItem({
        id: "SUBMIT",
        message:
          "La cantidad a particionar en todos los items no puede quedar en 0",
      });
    } else {
      var ordenDespachoEditada = { ...ordenDespacho.result, items: [] };
      var ordenDespachoNueva = { ...ordenDespacho.result, items: [] };

      let odc_impbru_ODEdit = 0.0;
      let odc_tasdct_ODEdit = 0.0;
      let odc_impde1_ODEdit = 0.0;
      let odc_impde2_ODEdit = 0.0;
      let odc_impigv_ODEdit = 0.0;
      let odc_imptot_ODEdit = 0.0;

      let odc_impbru_ODNueva = 0.0;
      let odc_tasdct_ODNueva = 0.0;
      let odc_impde1_ODNueva = 0.0;
      let odc_impde2_ODNueva = 0.0;
      let odc_impigv_ODNueva = 0.0;
      let odc_imptot_ODNueva = 0.0;

      for (let item of ordenDespacho.result.items) {
        let cantidadReducida = parseFloat(item.cantidadReducida);
        let cantidadParticionada = parseFloat(item.cantidadParticionada);

        let index_1 = ordenDespachoEditada.items.length;
        ordenDespachoEditada.items[index_1] = item;
        ordenDespachoEditada.items[index_1] = updateOrderItem(
          ordenDespachoEditada.items[index_1],
          item,
          cantidadReducida
        );

        odc_impbru_ODEdit += parseFloat(
          ordenDespachoEditada.items[index_1].odd_impbru
        );
        odc_tasdct_ODEdit += parseFloat(item.odc_tasdct) || 0;
        odc_impde1_ODEdit += ordenDespachoEditada.items[index_1].odd_impde1;
        odc_impde2_ODEdit += redondearDecimales(
          ordenDespachoEditada.items[index_1].odd_impde2 +
            ordenDespachoEditada.items[index_1].odd_impde3
        );
        odc_impigv_ODEdit += parseFloat(
          ordenDespachoEditada.items[index_1].odd_impigv
        );
        odc_imptot_ODEdit += parseFloat(
          ordenDespachoEditada.items[index_1].odd_imptot
        );

        if (cantidadParticionada > 0) {
          let index = ordenDespachoNueva.items.length;
          ordenDespachoNueva.items[index] = { ...item };
          ordenDespachoNueva.items[index].odc_numodc = "";
          ordenDespachoNueva.items[index] = updateOrderItem(
            ordenDespachoNueva.items[index],
            item,
            cantidadParticionada
          );

          odc_impbru_ODNueva += redondearDecimales(
            parseFloat(ordenDespachoNueva.items[index].odd_impbru)
          );
          odc_tasdct_ODNueva += parseFloat(item.odc_tasdct);
          odc_impde1_ODNueva += ordenDespachoNueva.items[index].odd_impde1;
          odc_impde2_ODNueva += redondearDecimales(
            ordenDespachoNueva.items[index].odd_impde2 +
              ordenDespachoNueva.items[index].odd_impde3
          );
          odc_impigv_ODNueva += parseFloat(
            ordenDespachoNueva.items[index].odd_impigv
          );
          odc_imptot_ODNueva += redondearDecimales(
            parseFloat(ordenDespachoNueva.items[index].odd_imptot)
          );

          delete ordenDespachoNueva.items[index].cantidadReducida;
          delete ordenDespachoNueva.items[index].cantidadParticionada;
        }

        delete ordenDespachoEditada.items[index_1].cantidadReducida;
        delete ordenDespachoEditada.items[index_1].cantidadParticionada;
      }

      ordenDespachoEditada.odc_impbru = odc_impbru_ODEdit;
      ordenDespachoEditada.odc_tasdct = odc_tasdct_ODEdit;
      ordenDespachoEditada.odc_impde1 = odc_impde1_ODEdit;
      ordenDespachoEditada.odc_impde2 = odc_impde2_ODEdit;
      ordenDespachoEditada.odc_impigv = odc_impigv_ODEdit;
      ordenDespachoEditada.odc_imptot = odc_imptot_ODEdit;

      ordenDespachoNueva.odc_impbru =
        redondearDecimales(parseFloat(odc_impbru_ODNueva)) || 0.0;
      ordenDespachoNueva.odc_tasdct = parseFloat(odc_tasdct_ODNueva) || 0.0;
      ordenDespachoNueva.odc_impde1 = parseFloat(odc_impde1_ODNueva) || 0.0;
      ordenDespachoNueva.odc_impde2 = parseFloat(odc_impde2_ODNueva) || 0.0;
      ordenDespachoNueva.odc_impigv = parseFloat(odc_impigv_ODNueva) || 0.0;
      ordenDespachoNueva.odc_imptot =
        redondearDecimales(parseFloat(odc_imptot_ODNueva)) || 0.0;
      ordenDespachoNueva.odc_numori = ordenDespachoEditada.odc_numodc;
      ordenDespachoNueva.odc_numodc = "";

      var listaOrdenes = new Array(2);
      listaOrdenes[0] = ordenDespachoEditada;
      listaOrdenes[1] = ordenDespachoNueva;
      //console.log("listaOrdenes", listaOrdenes);
      //console.log("listaOrdenes", JSON.stringify(listaOrdenes,null,2));

      const postPartitionOrders = async () => {
        const result = await postFetchFunction(
          `${API_DISTRIBUCION}/saveOrdenesDespachoParticionada`,
          listaOrdenes,
          setOpenMessage
        );
        //setRefreshTable((prev) => !prev);
        console.log("result postChofer", result);
      };
      postPartitionOrders();
    }

    //genera codigo OD - YYMM#### - 24050001
  };

  return (
    <>
      <div>
        <button
          className="py-2 px-4 text-red-50 cursor-pointer flex row-span-2 items-center space-x-2"
          onClick={() => {
            handleSelectOrdenDetails(ordenRow);
            setOpenModalParticionar(true);
          }}
        >
          <label htmlFor="" className="font-bold text-black cursor-pointer">
            Particionar OD
          </label>
          <IconDivide color="blue" />
        </button>
      </div>
      <ModalMessage
        open={openModalParticionar}
        setOpen={setOpenModalParticionar}
        title={"Partcionar Ordenes de Despacho"}
        titleBtnAceptar={"Crear Orden Parcial"}
        onBtnAceptar={() => onSubmitOrdenParcial()}
      >
        {/* <AlertMessage
          openMessage={openMessage}
          setOpenMessage={setOpenMessage}
        /> */}

        {!loadingTable ? (
          <>
            <div className="modal-group-container text-black">
              <div className="modal-group-item-container">
                <label htmlFor="">Canal:</label>
                <input
                  type="text"
                  className="modal-group-input-md"
                  defaultValue={ordenDespacho.result.aux_codaux}
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
                    defaultValue={ordenDespacho.result.aux_nomaux}
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
                    defaultValue={ordenDespacho.result.ppc_numppc}
                    readOnly
                  />
                </div>
                <div className="modal-group-item-container">
                  <label htmlFor="">Emision Pedido:</label>
                  <input
                    type="text"
                    className="modal-group-input-md"
                    defaultValue={ordenDespacho.result.emiPedido}
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
                    defaultValue={ordenDespacho.result.odc_numodc}
                    readOnly
                  />
                </div>
                <div className="modal-group-item-container">
                  <label htmlFor="">Emision Orden:</label>
                  <input
                    type="text"
                    className="modal-group-input-md"
                    defaultValue={convertirDateTimeToDate(
                      ordenDespacho.result.odc_fecdoc
                    )}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div>
              <CustomTablePagination
                rowTableComponent={rowTable}
                rows={ordenDespacho.result.items.sort((a, b) =>
                  a.prd_codprd.localeCompare(b.prd_codprd)
                )}
                loadingTable={loadingTable}
                columns={ORDENES_DESPACHO_PARTITION_TABLE_COLS_DESKTOP}
              ></CustomTablePagination>
              <div className="w-full text-center">
                {errorItem.id === "SUBMIT" && (
                  <span className="form-container-group-content-span-error">
                    {errorItem.message}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-center">
            <CircularProgress />
          </div>
        )}
      </ModalMessage>
    </>
  );
};

export default ParticionarODComponent;
