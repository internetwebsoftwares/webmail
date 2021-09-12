import React from "react";
import { Link } from "react-router-dom";

function Message({ message, avatarTextFormatted, dateFormatted }) {
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
            <h3>{message.senderName}</h3>
            <small>
              <strong>{!message.read ? "(Unread)" : ""}</strong>
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
