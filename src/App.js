import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";

import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import UpdateStudent from "./Components/UpdateStudent/UpdateStudent";
import SingleStudent from "./Components/SingleStudent/SingleStudent";
import RegisterStudent from "./Components/RegisterStudent/RegisterStudent";
import StudentList from "./Components/StudentList/StudentList";
import Dashboard from "./Components/Dashboard/Dashboard";
import Protected from "./Components/ProtectedRoute/ProtectedRoute";

function App(props) {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Protected
            exact
            path="/studentdetail/:userId"
            component={SingleStudent}
          />
          <Protected exact path="/dashboard" component={Dashboard} />
          <Protected
            exact
            path="/registerstudent"
            component={RegisterStudent}
          />
          <Protected
            exact
            path="/updatestudent/:userId"
            component={UpdateStudent}
          />
          <Protected exact path="/studentList" component={StudentList} />
          <Route
            path="/"
            exact
            render={(props) => <Login {...props} />}
          ></Route>
          <Route
            path="/signup"
            exact
            render={(props) => <Signup {...props} />}
          ></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default withRouter(App);
