import React, { useContext, useEffect, useState } from "react";
import "./inbox.css";
import "./app.css";
import axios from "axios";
import MainContext from "../MainContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const styles = {
  container: {
    width: "100%",
    maxWidth: "1000px",
    margin: "1rem auto",
    padding: "1rem",
  },
};

function Inbox() {
  const { userToken, searchText, setSearchBarVisible } =
    useContext(MainContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchInboxMsg() {
    setIsLoading(true);
    try {
      const response = await axios.get("/emails/received", {
        headers: {
          Authorization: userToken,
        },
      });
      setIsLoading(false);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSearchBarVisible(true);
    fetchInboxMsg();
    return () => setSearchBarVisible(false);
  }, []);

  useEffect(() => {
    let messages = Array.from(document.querySelectorAll(".inboxMessages"));
    messages.forEach((message) => {
      if (message.innerHTML.toLowerCase().includes(searchText.toLowerCase())) {
        message.classList.remove("hide");
      } else {
        message.classList.add("hide");
      }
    });
  }, [searchText]);

  if (isLoading) {
    return <Loading />;
  }

  if (messages.length < 1) {
    return (
      <center>
        <br />
        <h1>My inbox</h1>
        <h3 style={{ color: "#333" }}>There is no mail in your inbox</h3>
      </center>
    );
  }

  return (
    <div style={styles.container}>
      <center>
        <h1>My Inbox</h1>
      </center>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="refreshBtn" onClick={fetchInboxMsg}>
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
      {messages.map((message) => {
        const avatarText = message.senderName.split(" ");
        const avatarTextFormatted = avatarText[0][0] + avatarText[1][0];
        const dateFormatted = new Date(message.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        return (
          <Link
            to={`/message/${message._id}`}
            key={message._id}
            className="appMessage inboxMessages"
          >
            <div className="avatar">{avatarTextFormatted}</div>
            <div className="info">
              <div className="header">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3>{message.senderName}</h3>
                  <small>
                    <strong>{!message.read ? "(Unread)" : ""}</strong>
                  </small>
                </div>
                <small style={{ fontSize: ".75rem" }}>{dateFormatted}</small>
              </div>
              <p>
                {message.subject ? (
                  message.subject
                ) : (
                  <>
                    {message.message.length < 120
                      ? message.message
                      : `${message.message.slice(0, 120)}...`}
                  </>
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Inbox;
