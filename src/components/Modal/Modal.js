import React from "react";
import "./style.css";
import Button from "../Button";

function Modal({ isOpen, onClose, costs, date }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="modal-h4">Report of {date}</h4>
        <ol className="modal-ul">
          {costs.map((cost, i) => (
            <li key={i}>
              {cost.costItem + " ," +
                cost.sumOfItem + " ," +
                cost.categoryOfItem + " ," +
                cost.itemDescription}
            </li>
          ))}
        </ol>
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
