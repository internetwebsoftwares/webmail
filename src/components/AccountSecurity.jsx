import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MainContext from "../MainContext";
import "./app.css";
import ConfirmAlert from "./ConfirmAlert";
import "./forms.css";
import Loading from "./Loading";

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1rem",
  },
};

function AccountSecurity(props) {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [isDeletingEmails, setIsDeletingEmails] = useState(false);

  const { userToken, setIsUserLoggedIn, setAlertMessage, setIsAlertOpen } =
    useContext(MainContext);

  function closeAlert(e) {
    if (e.keyCode === 27 || e.keyCode === 32) {
      setIsConfirmAlertOpen(false);
    }
    window.removeEventListener("keyup", closeAlert);
  }

  window.addEventListener("keyup", closeAlert);

  async function handleDelete() {
    setIsConfirmAlertOpen(false);
    setIsDeletingEmails(true);
    try {
      const response = await axios.delete("/messages/inbox/delete/all", {
        headers: {
          Authorization: userToken,
        },
      });
      if (response.data === "All your emails have been deleted") {
        setIsDeletingEmails(false);
        setAlertMessage(response.data);
        setIsAlertOpen(true);
      } else {
        setIsDeletingEmails(false);
        setAlertMessage(response.data);
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsChangingPass(true);
    if (newPass !== confPass) {
      setAlertMessage("New password & confirm password didn't match");
      setIsAlertOpen(true);
      setIsChangingPass(false);
      return;
    }
    try {
      const response = await axios.patch(
        "/user/password/change",
        {
          currPass,
          newPass,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response.data === "Password changed.") {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsChangingPass(false);
        setIsUserLoggedIn(false);
        localStorage.removeItem("webmail-user");
        localStorage.removeItem("webmail-token");
        props.history.push("/login");
      } else {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsChangingPass(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isDeletingEmails) {
    return <Loading />;
  }

  return (
    <div style={styles.container}>
      {isConfirmAlertOpen && (
        <ConfirmAlert
          handleDelete={handleDelete}
          setIsConfirmAlertOpen={setIsConfirmAlertOpen}
        />
      )}
      <center>
        <h1>Change password</h1>
      </center>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="appInput">
          <input
            autoFocus
            required
            value={currPass}
            onChange={(e) => setCurrPass(e.target.value)}
            type="password"
            placeholder=" "
          />
          <label>Current password</label>
        </div>
        <div className="appInput">
          <input
            required
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            type="password"
            placeholder=" "
          />
          <label>New password</label>
        </div>
        <div className="appInput">
          <input
            required
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            type="password"
            placeholder=" "
          />
          <label>Confirm password</label>
        </div>
        <button
          disabled={isChangingPass}
          type="submit"
          className="appBtn appBtn-block appBtn-primary"
        >
          {isChangingPass ? "Changing password..." : "Change password"}
        </button>
      </form>
      <hr />
      <br />
      <h1>Delete all your emails</h1>
      <br />
      <button
        onClick={() => setIsConfirmAlertOpen(true)}
        type="button"
        className="appBtn appBtn-danger"
      >
        Delete
      </button>
    </div>
  );
}

export default withRouter(AccountSecurity);
