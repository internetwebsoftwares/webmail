import React, { useContext, useEffect, useState } from "react";
import "./inbox.css";
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

function SentMessages() {
  const { userToken, searchText, setSearchBarVisible } =
    useContext(MainContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setSearchBarVisible(true);
    async function fetchSentMsg() {
      setIsLoading(true);
      try {
        const response = await axios.get("/emails/sent", {
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
    fetchSentMsg();
    return () => setSearchBarVisible(false);
  }, []);

  useEffect(() => {
    let messages = Array.from(document.querySelectorAll(".sentMessages"));
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

  return (
    <div style={styles.container}>
      <center>
        <h1>My Sent messages</h1>
      </center>
      <br />
      {messages.map((message) => {
        const avatarText = message.receiverName.split(" ");
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
            className="appMessage sentMessages"
          >
            <div className="avatar">{avatarTextFormatted}</div>
            <div className="info">
              <div className="header">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3>{message.to}</h3>
                </div>
                <small style={{ fontSize: ".75rem" }}>{dateFormatted}</small>
              </div>
              <p>
                {message.message.length < 120
                  ? message.message
                  : `${message.message.slice(0, 120)}...`}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SentMessages;
