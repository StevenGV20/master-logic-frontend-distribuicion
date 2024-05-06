import React, { useState } from "react";
import ModalMessage from "../widgets/ModalComponent";

const ParticionarODComponent = ({
  handleSelectOrden,
  ordenSelected,
  ordenRow,
}) => {
  const [openModalParticionar, setOpenModalParticionar] = useState(false);
  return (
    <>
      <div>
        <button
          className="bg-black text-white py-2 px-4"
          onClick={() => {
            handleSelectOrden(ordenRow);
            setOpenModalParticionar(true);
          }}
        >
          Particionar OD
        </button>
      </div>
      <ModalMessage
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
              defaultValue={ordenSelected.canal}
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
                defaultValue={ordenSelected.cliente}
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
                defaultValue={ordenSelected.numeroPedido}
                readOnly
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Emision Pedido:</label>
              <input
                type="text"
                className="modal-group-input-md"
                defaultValue={ordenSelected.emisionPedido}
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
                defaultValue={ordenSelected.numeroOrdenDespacho}
                readOnly
              />
            </div>
            <div className="modal-group-item-container">
              <label htmlFor="">Emision Orden:</label>
              <input
                type="text"
                className="modal-group-input-md"
                defaultValue={ordenSelected.emisionOrden}
                readOnly
              />
            </div>
          </div>
        </div>
      </ModalMessage>
    </>
  );
};

export default ParticionarODComponent;
