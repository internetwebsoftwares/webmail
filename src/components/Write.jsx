import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import MainContext from "../MainContext";
import "./forms.css";

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "1rem auto",
    padding: "1rem",
  },
};

function Write(props) {
  const { mainUser, userToken, setAlertMessage, setIsAlertOpen } =
    useContext(MainContext);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await axios.post(
        "/email/new",
        {
          to,
          subject,
          message,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log(response.data);
      if (!response.data.includes("Email has been sent to")) {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsSending(false);
      } else {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsSending(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={styles.container}>
      <center>
        <h1>Write an email</h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="appInput">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder=" "
            type="email"
            list="emails"
            autoComplete="none"
            required
          />
          <label>Enter receiver's email address here</label>
          <datalist id="emails">
            {mainUser.clientEmailIds.map((email) => {
              return <option value={email}></option>;
            })}
          </datalist>
        </div>

        <div className="appInput">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            placeholder=" "
            autoComplete="none"
          />
          <label>Subject</label>
        </div>
        <div className="appInput">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            placeholder=" "
          ></textarea>
          <label>Message</label>
        </div>

        <button
          disabled={isSending}
          className="appBtn appBtn-primary appBtn-block"
          type="submit"
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
      <br />
    </div>
  );
}

export default Write;
