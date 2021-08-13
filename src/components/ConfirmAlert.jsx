import React from "react";
import "./app.css";

function ConfirmAlert({ setIsConfirmAlertOpen, handleDelete }) {
  return (
    <>
      <div
        onClick={() => setIsConfirmAlertOpen(false)}
        className="appAlert-backdrop"
      ></div>
      <div className="appAlert">
        <div className="info">
          <h2>Are you sure?</h2>
          <p>Do you want to delete all your emails permanently?</p>
        </div>
        <div className="footer confirm-footer">
          <button onClick={handleDelete}>Yes</button>
          <button
            style={{ color: "red" }}
            onClick={() => setIsConfirmAlertOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmAlert;
