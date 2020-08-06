import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "../Services/firebase";

function ProtectedRoute({ component: Comp, ...rest }) {
  let user = firebase.auth().currentUser;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user.uid) {
          return <Comp {...props} />;
        } else {
          return <Redirect path="/" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
