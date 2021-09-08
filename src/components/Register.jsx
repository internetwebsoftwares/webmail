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

function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    setMainUser,
    setUserToken,
    setIsUserLoggedIn,
    setIsAlertOpen,
    setAlertMessage,
  } = useContext(MainContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const response = await axios.post("/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (!response.data.user) {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsRegistering(false);
      } else {
        localStorage.setItem(
          "webmail-user",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem(
          "webmail-token",
          JSON.stringify(response.data.token)
        );
        setIsRegistering(false);
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
        <h3>Register</h3>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="appInput">
          <input
            autoFocus
            placeholder=" "
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            required
          />
          <label>Enter firstname</label>
        </div>
        <div className="appInput">
          <input
            placeholder=" "
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            required
          />
          <label>Enter lastname</label>
        </div>
        <div className="appInput">
          <input
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <label>Enter email</label>
        </div>
        <div className="appInput">
          <input
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <label>Enter password</label>
        </div>
        <button
          disabled={isRegistering}
          className="appBtn appBtn-block appBtn-primary"
        >
          {isRegistering ? "Registering..." : "Register"}
        </button>
        <center>
          <p>
            <small>
              Already have an account?{" "}
              <Link to="/login">
                <b>Login</b>
              </Link>{" "}
            </small>
          </p>
        </center>
      </form>
    </div>
  );
}

export default withRouter(Register);
