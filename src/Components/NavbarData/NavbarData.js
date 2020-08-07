import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import firebase from "../Services/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/images/madrassa-new.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faUser } from "@fortawesome/free-solid-svg-icons";

function NavbarData(props) {
  const logout = () => {
    firebase.auth().signOut();
    props.history.push("/");
    toast("User Logout Successfully!", {
      type: "success",
    });
  };
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/dashboard">
            <img
              style={{ width: "40px", height: "40px" }}
              src={img}
              className="rounded"
              alt="Cinque Terre"
            />
          </Link>
        </Navbar.Brand>
        &nbsp;
        <Navbar.Brand>
          <Link style={{ color: "black" }} to="/dashboard">
            MADRASA MANAGMENT SYSTEM
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link> */}
          <Link to="/registerstudent">
            <FontAwesomeIcon icon={faUser} className="mx-1" />
            Register Student
          </Link>
          &nbsp;
          {/* </Nav.Link> */}
          {/* <Nav.Link> */}
          <Link to="/studentList">
            <FontAwesomeIcon icon={faList} className="mx-1" />
            Student List
          </Link>
          {/* </Nav.Link> */}
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        {/* <Form inline> */}
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        <Button variant="contained" onClick={logout} color="secondary">
          Logout
        </Button>
        {/* <Button variant="outline-primary">Logout</Button> */}
        {/* </Form> */}
      </Navbar>
    </div>
  );
}

export default withRouter(NavbarData);
