import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContext from "../MainContext";
import "./header.css";

function Header() {
  const { isUserLoggedIn, mainUser, searchEmails, isSearchBarVisible } =
    useContext(MainContext);

  useEffect(() => {}, [mainUser]);

  return (
    <header className="appHeader">
      <div className="left">
        <Link to="/">
          <h2>webMa!l</h2>
        </Link>
      </div>
      {isUserLoggedIn && isSearchBarVisible && (
        <div className="searchBar">
          <i className="fas fa-search"></i>
          <input
            onChange={searchEmails}
            type="text"
            placeholder="Search emails here..."
          />
        </div>
      )}

      <div className="right">
        {isUserLoggedIn && (
          <Link
            title="settings"
            to="/settings"
            className="avatar"
          >{`${mainUser.firstName[0]}${mainUser.lastName[0]}`}</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
