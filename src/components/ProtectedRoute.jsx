import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import MainContext from "../MainContext";

function ProtectedRoute({ children, path }) {
  const { isUserLoggedIn } = useContext(MainContext);
  return (
    <div>
      {isUserLoggedIn ? (
        <Route to={path} exact>
          {children}
        </Route>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default ProtectedRoute;
