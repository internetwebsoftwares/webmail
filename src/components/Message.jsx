import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContext from "../MainContext";

function Message({ message, avatarTextFormatted, dateFormatted, usedIn }) {
  const { searchText } = useContext(MainContext);

  useEffect(() => {
    let messages = Array.from(document.querySelectorAll(".appMessage"));
    messages.forEach((message) => {
      if (message.innerHTML.toLowerCase().includes(searchText.toLowerCase())) {
        message.classList.remove("hide");
      } else {
        message.classList.add("hide");
      }
    });
  }, [searchText]);
  return (
    <Link
      to={`/message/${message._id}`}
      key={message._id}
      className="appMessage"
    >
      <div className="avatar">{avatarTextFormatted}</div>
      <div className="info">
        <div className="header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>
              {usedIn === "inbox" ? message.senderName : message.receiverName}
            </h3>
            <small>
              <strong>
                {!message.read && usedIn === "inbox" ? "(Unread)" : ""}
              </strong>
            </small>
          </div>
          <small style={{ fontSize: ".75rem" }}>{dateFormatted}</small>
        </div>
        {message.subject && <small>Subject: {message.subject}</small>}

        <p>
          {message.message.length < 50
            ? message.message
            : `${message.message.slice(0, 50)}.....`}
        </p>
      </div>
    </Link>
  );
}

export default Message;
