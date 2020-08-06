import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
} from "mdbreact";
import firebase from "../Services/firebase";
import { SignIn } from "../Services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let user = firebase.auth().currentUser;
    console.log("user", user);
    //if user redirect dashboard
    if (user && user.uid) {
      history.push("/");
    }
  }, [firebase]);

  let history = useHistory();
  const LoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await SignIn(email, password);
      props.history.push("/dashboard");

      setEmail("");
      setPassword("");
      toast("User Login Successfully!", {
        type: "success",
      });
      console.log("user login successfull");
    } catch (error) {
      toast("Login Error! Please try again", {
        type: "error",
      });
      setError(error.message);
      // hideTimeout = setTimeout(() => setError(""), 4000);
      // setError(error.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol style={{ margin: "0 auto", marginTop: "5rem" }} md="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login:
                  </h3>
                </MDBCardHeader>
                <form>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      validate
                    />
                  </div>

                  <div className="text-center mt-4">
                    {error ? <h6 style={{ color: "red" }}>{error}</h6> : null}
                    <MDBBtn
                      color="light-blue"
                      className="mb-3"
                      onClick={LoginSubmit}
                      type="submit"
                    >
                      Login
                    </MDBBtn>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>
                      Not a member?<Link to="/signup">Sign Up</Link>
                    </p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default withRouter(Login);
