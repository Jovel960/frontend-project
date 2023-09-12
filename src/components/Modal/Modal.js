import React from "react";
import "./style.css";
import Button from "../Button";
import Costs from "../Costs";
//Modal component
function Modal({ isOpen, onClose, costs, date }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="modal-h4">Report of {date}</h4>
        <Costs costs={costs} />
        <div className="modal-footer">
          <Button
            placeHolder="Close"
            handleClick={onClose}
            className="waves-light clear-costs btn black"
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
