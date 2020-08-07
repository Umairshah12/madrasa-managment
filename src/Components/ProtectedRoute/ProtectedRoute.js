import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Comp, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("login") ? <Comp {...props} /> : <Redirect to="/" />
    }
  ></Route>
);

export default ProtectedRoute;
