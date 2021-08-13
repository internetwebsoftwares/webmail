import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./navigation.css";

function Navigation() {
  const history = useHistory();
  function goBack() {
    history.goBack();
  }
  return (
    <center>
      <br />
      <div className="appNavigationTab">
        <Link title="Go back" onClick={goBack} className="tab" to="/inbox">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <NavLink activeClassName="active" className="tab" to="/inbox">
          <i className="fas fa-envelope"></i> Inbox
        </NavLink>
        <NavLink activeClassName="active" className="tab" to="/sent-messages">
          <i className="fas fa-arrow-right"></i>
          Sent
        </NavLink>
        <NavLink activeClassName="active" className="tab" to="/email/new">
          <i className="fas fa-pencil-alt"></i>
          Write
        </NavLink>
      </div>
    </center>
  );
}

export default Navigation;
