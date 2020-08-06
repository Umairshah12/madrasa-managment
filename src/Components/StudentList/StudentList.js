import React, { useState, useEffect } from "react";
import NavbarData from "../NavbarData/NavbarData";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../Services/firebase";
import "mdbreact/dist/css/mdb.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

toast.configure();
function StudentList() {
  const [studentList, setStudentList] = useState([]);

  let user = firebase.auth().currentUser;
  useEffect(() => {
    if (user) {
      const db = firebase.firestore();
      db.collection("students")
        .where("uid", "==", user.uid)
        .onSnapshot((data) => {
          setStudentList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    } else {
      console.log("no user found");
    }

    // getUsers();
  }, []);

  const UserDelete = (id) => {
    firebase.firestore().collection("students").doc(id).delete();
    toast("User Deleted Successfully!", {
      type: "success",
    });
  };

  const fields = [
    { key: "username", label: "USER NAME", _style: { width: "15%" } },
    { key: "userfname", label: "FATHER NAME", _style: { width: "15%" } },
    { key: "cnic", label: "CNIC", _style: { width: "20%" } },
    { key: "primarycntct", label: "PRIMARY CONTACT", _style: { width: "15%" } },
    {
      key: "secondarycnct",
      label: "SECONDARY CONTACT",
      _style: { width: "15%" },
    },
    { key: "dob", label: "DATE OF BIRTH", _style: { width: "25%" } },

    { key: "address", label: "ADDRESS", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "Action",
      _style: { width: "50%" },
    },
  ];
  return (
    <div>
      <NavbarData />
      <div className="card">
        <CCardHeader>
          <CBadge style={{ fontSize: "17px" }} className="mr-1" color="primary">
            REGISTERD STUDENT LIST
          </CBadge>
          {/* <CBadge color="success"></CBadge> */}
        </CCardHeader>
        {/* <CCardHeader>REGISTERD STUDENT LIST</CCardHeader> */}
        {/* <div className="card-header"></div> */}
        <div className="card-body">
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={studentList}
                    fields={fields}
                    columnFilter
                    tableFilter
                    // footer
                    itemsPerPageSelect
                    itemsPerPage={5}
                    hover
                    sorter
                    pagination
                    scopedSlots={{
                      show_details: (item, index) => {
                        return (
                          <>
                            <td
                              style={{
                                display: "-webkit-box",
                                verticalAlign: "Top",
                                padding: "0.75rem",
                              }}
                            >
                              <Link to={`/updatestudent/${item.id}`}>
                                <FontAwesomeIcon
                                  style={{ marginTop: "-6px" }}
                                  icon={faEdit}
                                />
                              </Link>

                              <FontAwesomeIcon
                                icon={faTrash}
                                color="red"
                                style={{ marginTop: "11px" }}
                                onClick={() => UserDelete(item.id)}
                              />

                              <Link to={`/studentdetail/${item.id}`}>
                                <FontAwesomeIcon
                                  style={{ marginTop: "-6px" }}
                                  icon={faUser}
                                />
                              </Link>
                            </td>
                          </>
                        );
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
