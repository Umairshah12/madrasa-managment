import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  let user = firebase.auth().currentUser;
  let history = useHistory();
  useEffect(() => {
    //if user redirect dashboard
    if (user) {
      history.push("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      //   console.log("user", user);
      await firebase.firestore().collection("users").doc(user.uid).set({
        username,
        id: user.uid,
        email,
      });
      toast("User Registerd Successfully!", {
        type: "success",
      });
      setEmail("");
      setPassword("");
      setUsername("");
      props.history.replace("/dashboard");
    } catch (error) {
      setError(error.message);
      toast("Login Error! Please try again", {
        type: "error",
      });
      setEmail("");
      setPassword("");
      setUsername("");
      // console.log(error.message);
    }
  };

  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol style={{ margin: "0 auto", marginTop: "5rem" }} md="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> SignUp:
                  </h3>
                </MDBCardHeader>
                <form>
                  <div className="grey-text">
                    <MDBInput
                      label="Your name"
                      icon="user"
                      group
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      validate
                    />
                  </div>
                  <div className="text-center mt-4">
                    {error ? <h6 style={{ color: "red" }}>{error}</h6> : null}
                    <MDBBtn
                      color="deep-orange"
                      className="mb-3"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Sign Up
                    </MDBBtn>
                  </div>
                </form>

                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>
                      Not a member? <Link to="/">Login</Link>
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

export default withRouter(Signup);
