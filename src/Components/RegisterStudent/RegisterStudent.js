import React, { useState } from "react";
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
import CIcon from "@coreui/icons-react";
import { useForm } from "react-hook-form";
import firebase from "../Services/firebase";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "./Registration.css";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function RegisterStudent(props) {
  const { register, errors, handleSubmit, clearErrors } = useForm();
  const [userName, setUserName] = useState("");
  const [userFname, setUserFname] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [dob, setdob] = useState("");
  const [primaryCntct, setPrimaryCntct] = useState("");
  const [secondaryCnct, setSecondaryCntct] = useState("");
  const [address, setAddress] = useState("");

  const user = firebase.auth().currentUser;
  const clearField = () => {
    setUserName("");
    setUserFname("");
    setCNIC("");
    setdob("");
    setPrimaryCntct("");
    setSecondaryCntct("");
    setAddress("");
  };

  const handleSubmitForm = (data) => {
    // console.log(data);
    try {
      firebase.firestore().collection("students").add({
        uid: user.uid,
        username: userName,
        userfname: userFname,
        cnic: CNIC,
        dob: dob,
        primarycntct: primaryCntct,
        secondarycnct: secondaryCnct,
        address: address,
      });
      clearField();
      toast("User Register  Successfully!", {
        type: "success",
      });
      // console.log("USER register successfully");
    } catch (error) {
      console.log("form submition error", error.message);
      clearField();
    }
  };

  return (
    <div>
      <NavbarData />
      <div className="card">
        <CCardHeader>
          <CBadge style={{ fontSize: "17px" }} className="mr-1" color="primary">
            USER REGISTRATION FORM
          </CBadge>
        </CCardHeader>

        <div className="card-body">
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardBody>
                  <CForm
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="form-horizontal"
                  >
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="name">STUDENT NAME</CLabel>
                        <CInput
                          type="text"
                          onChange={(e) => setUserName(e.target.value)}
                          value={userName}
                          name="username"
                          innerRef={register({ required: true })}
                          placeholder="Enter your name..."
                          autoComplete="email"
                        />

                        {errors.username && (
                          <span className="error">This field is required</span>
                        )}
                      </CCol>
                      <CCol md="4">
                        <CLabel htmlFor="name">FATHER NAME</CLabel>
                        <CInput
                          type="text"
                          name="fathername"
                          innerRef={register({ required: true })}
                          onChange={(e) => setUserFname(e.target.value)}
                          value={userFname}
                          placeholder="Enter your name..."
                        />
                        {errors.fathername && (
                          <span className="error">This field is required</span>
                        )}
                      </CCol>
                      <CCol md="4">
                        <CLabel htmlFor="name">CNIC NO</CLabel>
                        <CInput
                          type="text"
                          name="cnic"
                          innerRef={register({ required: true })}
                          onChange={(e) => setCNIC(e.target.value)}
                          value={CNIC}
                          placeholder="Enter CNIC NO ...."
                        />
                        {errors.cnic && (
                          <span className="error">This field is required</span>
                        )}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="name">DOB</CLabel>
                        <CInput
                          type="date"
                          onChange={(e) => setdob(e.target.value)}
                          value={dob}
                          name="date"
                          innerRef={register({ required: true })}
                          placeholder="date"
                        />
                        {errors.date && (
                          <span className="error">This field is required</span>
                        )}
                      </CCol>
                      <CCol md="4">
                        <CLabel htmlFor="name">PRIMARY CONTACT NO</CLabel>
                        <CInput
                          type="number"
                          onChange={(e) => setPrimaryCntct(e.target.value)}
                          value={primaryCntct}
                          name="primarycontact"
                          placeholder="Enter contact No ...."
                          innerRef={register({ required: true })}
                        />
                        {errors.primarycontact && (
                          <span className="error">This field is required</span>
                        )}
                      </CCol>

                      <CCol md="4">
                        <CLabel htmlFor="name" required>
                          SECONDARY CONTACT NO
                        </CLabel>
                        <CInput
                          type="number"
                          onChange={(e) => setSecondaryCntct(e.target.value)}
                          value={secondaryCnct}
                          name="secondarycontact"
                          placeholder="Enter contact No ...."
                          innerRef={register({ required: true })}
                        />
                        {errors.secondarycontact && (
                          <span className="error">This field is required</span>
                        )}
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
                          name="address"
                          rows="4"
                          placeholder="Enter Address....."
                          innerRef={register({ required: true })}
                        />
                        {errors.address && (
                          <span className="error">This field is required</span>
                        )}
                      </CCol>
                    </CFormGroup>
                    <CCardFooter>
                      <CButton type="submit" size="sm" color="success">
                        <CIcon name="cil-scrubber" /> Register
                      </CButton>{" "}
                      <CButton
                        type="reset"
                        onClick={clearField}
                        size="sm"
                        color="danger"
                      >
                        <CIcon name="cil-ban" /> Cancel
                      </CButton>{" "}
                      <CButton
                        type="reset"
                        onClick={() => clearErrors()}
                        size="sm"
                        color="info"
                      >
                        <CIcon name="cil-trash" /> Clear Errors
                      </CButton>
                    </CCardFooter>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterStudent);
