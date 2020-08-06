import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { logout } from "../Services/auth";
import { withRouter } from "react-router-dom";
import firebase from "../Services/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Link exact to="/dashboard">
            MADRASA MANAGMENT SYSTEM
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link exact to="/registerstudent">
              {/* <FontAwesomeIcon icon={faHome} className="mx-1" /> */}
              Register Student
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link exact to="/studentList">
              {/* <FontAwesomeIcon icon={faHome} className="mx-1" /> */}
              Student List
            </Link>
          </Nav.Link>
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        {/* <Form inline> */}
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        <Button variant="outline-primary" onClick={logout}>
          Logout
        </Button>
        {/* </Form> */}
      </Navbar>
    </div>
  );
}

export default withRouter(NavbarData);
