import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import Loading from "./Loading";

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "1rem",
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#3f51b5",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: ".6rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  bodyHeader: {
    color: "#333",
  },
};

function OneMessage() {
  const [message, setMessage] = useState({});
  const { userToken, mainUser } = useContext(MainContext);
  const id = window.location.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadMessage() {
      try {
        const response = await axios.get(`/message/${id}`, {
          headers: {
            Authorization: userToken,
          },
        });
        setMessage(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadMessage();
  }, [id]);

  if (isLoading) {
    return (
      <center>
        <Loading />
      </center>
    );
  }

  let avatarText = message.senderName.split(" ");
  let avatarTextFormatted = avatarText[0][0] + avatarText[1][0];

  return (
    <div style={styles.container}>
      <div style={styles.header} className="header">
        <div style={styles.avatar} className="avatar">
          {avatarTextFormatted}
        </div>
        <div>
          <h3>{message.senderName}</h3>
          <div style={styles.bodyHeader} className="bodyHeader">
            <small>
              From:{" "}
              <strong>
                {message.from === mainUser.email ? "Me" : message.from}
              </strong>
            </small>
            {", "}
            <small>
              to:{" "}
              <strong>
                {message.to === mainUser.email ? "Me" : message.to}
              </strong>
            </small>
          </div>
        </div>
      </div>
      <div className="body">
        <br />
        <p>{message.message}</p>
      </div>
    </div>
  );
}

export default OneMessage;
