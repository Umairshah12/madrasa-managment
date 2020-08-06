import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import NavbarData from "../NavbarData/NavbarData";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CBadge,
  CCardHeader,
} from "@coreui/react";
import firebase from "../Services/firebase";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function UpdateStudent(props) {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userFname, setUserFname] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [dob, setdob] = useState("");
  const [primaryCntct, setPrimaryCntct] = useState("");
  const [secondaryCnct, setSecondaryCntct] = useState("");
  const [address, setAddress] = useState("");
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (userId) {
      let docRef = firebase.firestore().collection("students").doc(userId);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setUserName(doc.data().username);
            setUserFname(doc.data().userfname);
            setCNIC(doc.data().cnic);
            setdob(doc.data().dob);
            setPrimaryCntct(doc.data().primarycntct);
            setSecondaryCntct(doc.data().secondarycnct);
            setAddress(doc.data().address);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [userId]);

  const UpdateStudent = () => {
    firebase.firestore().collection("students").doc(userId).set({
      uid: user.uid,
      username: userName,
      userfname: userFname,
      cnic: CNIC,
      dob: dob,
      primarycntct: primaryCntct,
      secondarycnct: secondaryCnct,
      address: address,
    });
    toast("User data Updated Successfully!", {
      type: "success",
    });
    console.log("data updated successfully");
    props.history.replace("/studentlist");
  };
  return (
    <div>
      <NavbarData />
      <div className="card">
        <CCardHeader>
          <CBadge style={{ fontSize: "17px" }} className="mr-1" color="primary">
            UPDATE REGISTER USER
          </CBadge>
        </CCardHeader>

        <div className="card-body">
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardBody>
                  <CForm action="" method="post" className="form-horizontal">
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="name">STUDENT NAME</CLabel>
                        <CInput
                          type="text"
                          required="required"
                          onChange={(e) => setUserName(e.target.value)}
                          value={userName}
                          placeholder="Enter your name..."
                        />
                      </CCol>
                      <CCol md="4">
                        <CLabel htmlFor="name">FATHER NAME</CLabel>
                        <CInput
                          type="text"
                          required="required"
                          onChange={(e) => setUserFname(e.target.value)}
                          value={userFname}
                          placeholder="Enter your name..."
                        />
                      </CCol>
                      <CCol md="4">
                        <CLabel htmlFor="name">CNIC NO</CLabel>
                        <CInput
                          type="text"
                          onChange={(e) => setCNIC(e.target.value)}
                          value={CNIC}
                          required="required"
                          placeholder="Enter CNIC NO ...."
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="name">DOB</CLabel>
                        <CInput
                          required="required"
                          type="date"
                          onChange={(e) => setdob(e.target.value)}
                          value={dob}
                          id="date-input"
                          name="date-input"
                          placeholder="date"
                        />
                      </CCol>
                      <CCol md="4">
                        <CLabel htmlFor="name">PRIMARY CONTACT NO</CLabel>
                        <CInput
                          type="number"
                          required="required"
                          onChange={(e) => setPrimaryCntct(e.target.value)}
                          value={primaryCntct}
                          placeholder="Enter contact No ...."
                        />
                      </CCol>

                      <CCol md="4">
                        <CLabel htmlFor="name">SECONDARY CONTACT NO</CLabel>
                        <CInput
                          type="number"
                          onChange={(e) => setSecondaryCntct(e.target.value)}
                          value={secondaryCnct}
                          required="required"
                          placeholder="Enter contact No ...."
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="12">
                        <CLabel htmlFor="name">ADDRESS</CLabel>
                        <CTextarea
                          name="textarea-input"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                          id="textarea-input"
                          rows="4"
                          placeholder="Enter Address....."
                        />
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    type="submit"
                    onClick={UpdateStudent}
                    size="sm"
                    color="success"
                  >
                    <CIcon name="cil-scrubber" /> Update Student
                  </CButton>{" "}
                  {/* <CButton type="reset" onClick="" size="sm" color="danger">
                  <CIcon name="cil-ban" /> Cancel
                </CButton> */}
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    </div>
  );
}

export default withRouter(UpdateStudent);
