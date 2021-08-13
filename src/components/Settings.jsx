import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MainContext from "../MainContext";
import "./app.css";
import "./forms.css";

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
  },
};

function Settings(props) {
  const { userToken, setIsUserLoggedIn, setIsAlertOpen, setAlertMessage } =
    useContext(MainContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      const response = await axios.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response.data === "Logged out successfully") {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsLoggingOut(false);
        setIsUserLoggedIn(false);
        localStorage.removeItem("webmail-user");
        localStorage.removeItem("webmail-token");
        props.history.push("/login");
      } else {
        setIsLoggingOut(false);
        setAlertMessage(response.data);
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={styles.container}>
      <center>
        <h1>Settings</h1>
      </center>
      <br />
      <ul className="appList">
        <Link to="/update-profile">
          <li>
            <div>
              <i className="fas fa-user-edit"></i> Update profile
            </div>
            <i className="fas fa-chevron-right"></i>
          </li>
        </Link>
        <Link to="/account-security">
          <li>
            <div>
              <i className="fas fa-shield-alt"></i> Account security
            </div>
            <i className="fas fa-chevron-right"></i>
          </li>
        </Link>
        <form onSubmit={handleSubmit}>
          <button
            disabled={isLoggingOut}
            type="submit"
            className="appBtn appBtn-block appBtn-danger"
          >
            <i style={{ color: "#fff" }} className="fas fa-sign-out-alt"></i>
            {isLoggingOut ? " Logging out..." : " Logout"}
          </button>
        </form>
      </ul>
    </div>
  );
}

export default withRouter(Settings);
