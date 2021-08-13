import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MainContext from "../MainContext";
import "./forms.css";

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1rem",
  },
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    setMainUser,
    setUserToken,
    setIsUserLoggedIn,
    setIsAlertOpen,
    setAlertMessage,
  } = useContext(MainContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (!response.data.user) {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsLoggingIn(false);
      } else {
        localStorage.setItem(
          "webmail-user",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem(
          "webmail-token",
          JSON.stringify(response.data.token)
        );
        setIsLoggingIn(false);
        setMainUser(response.data.user);
        setIsUserLoggedIn(true);
        setUserToken(response.data.token);
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={styles.container} className="registerScreen">
      <center>
        <h3>Login</h3>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="appInput">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder=" "
          />
          <label>Enter email</label>
        </div>
        <div className="appInput">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder=" "
          />
          <label>Enter password</label>
        </div>
        <button
          disabled={isLoggingIn}
          className="appBtn appBtn-block appBtn-primary"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        <center>
          <p>
            <small>
              Don't have an account?{" "}
              <Link to="/register">
                <b>Register</b>
              </Link>{" "}
            </small>
          </p>
        </center>
      </form>
    </div>
  );
}

export default withRouter(Login);
