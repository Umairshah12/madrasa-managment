import React, { useState, useEffect } from "react";
import { CRow, CCol } from "@coreui/react";
import firebase from "../Services/firebase";
import { Link } from "react-router-dom";

function Widgets() {
  const [count, setCount] = useState("");
  // render

  useEffect(() => {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then(function (querySnapshot) {
        // console.log(querySnapshot.size);
        setCount(querySnapshot.size);
      });
  }, []);
  return (
    // <div className="container">
    <CRow>
      <CCol sm="4" lg="4">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">REGISTERED STUDENT</div>
          <div className="card-body">
            <h5 className="card-title">{count}</h5>
            <p style={{ color: "white" }}>Students Registered</p>
          </div>
        </div>
      </CCol>
      <CCol sm="4" lg="4">
        <Link to="/registerstudent">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">UP COMING</div>
            <div className="card-body">
              <h5 className="card-title">Student</h5>
              <p style={{ color: "white" }}> Registration</p>
            </div>
          </div>
        </Link>
      </CCol>
      <CCol sm="4" lg="4">
        <Link to="/studentlist">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">STUDENT LIST</div>
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p style={{ color: "white" }}> Registered</p>
            </div>
          </div>
        </Link>
      </CCol>
    </CRow>
    // </div>
  );
}

export default Widgets;
