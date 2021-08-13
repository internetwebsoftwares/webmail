import React, { useContext } from "react";
import MainContext from "../MainContext";
import "./app.css";

function Alert({ message }) {
  const { setIsAlertOpen } = useContext(MainContext);
  return (
    <>
      <div
        onClick={() => setIsAlertOpen(false)}
        className="appAlert-backdrop"
      ></div>
      <div className="appAlert">
        <div className="info">
          <h3>Notification</h3>
          <p>{message}</p>
        </div>
        <div className="footer">
          <button onClick={() => setIsAlertOpen(false)}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Alert;
