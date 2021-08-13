import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import MainContext from "./MainContext";
import SentMessages from "./components/SentMessages";
import Write from "./components/Write";
import OneMessage from "./components/OneMessage";
import Settings from "./components/Settings";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/AccountSecurity";
import Alert from "./components/Alert";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.baseURL = "https://api-webmail.herokuapp.com";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    Boolean(localStorage.getItem("webmail-token"))
  );

  const [mainUser, setMainUser] = useState(
    JSON.parse(localStorage.getItem("webmail-user"))
  );

  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage.getItem("webmail-token"))
  );

  const [searchText, setSearchText] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);

  function searchEmails(e) {
    setSearchText(e.target.value);
  }

  function closeAlert(e) {
    if (e.keyCode === 27 || e.keyCode === 32) {
      setIsAlertOpen(false);
    }
    window.removeEventListener("keyup", closeAlert);
  }

  window.addEventListener("keyup", closeAlert);

  return (
    <MainContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        mainUser,
        setMainUser,
        userToken,
        setUserToken,
        searchEmails,
        searchText,
        setAlertMessage,
        setIsAlertOpen,
        isSearchBarVisible,
        setSearchBarVisible,
      }}
    >
      <BrowserRouter>
        <Header />
        {isUserLoggedIn && <Navigation />}

        {isAlertOpen && <Alert message={alertMessage} />}

        <Switch>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <Inbox />
          </Route>
          <ProtectedRoute path="/inbox" exact>
            <Inbox />
          </ProtectedRoute>
          <ProtectedRoute path="/sent-messages" exact>
            <SentMessages />
          </ProtectedRoute>
          <ProtectedRoute path="/email/new">
            <Write />
          </ProtectedRoute>
          <ProtectedRoute path="/message/:id">
            <OneMessage />
          </ProtectedRoute>
          <ProtectedRoute path="/settings">
            <Settings />
          </ProtectedRoute>
          <ProtectedRoute path="/update-profile">
            <UpdateProfile />
          </ProtectedRoute>
          <ProtectedRoute path="/account-security">
            <ChangePassword />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
