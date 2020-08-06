import React from "react";
import { withRouter } from "react-router-dom";
import NavbarData from "../NavbarData/NavbarData";
import Widgets from "../Widgets/Widgets";
function Dashboard(props) {
  return (
    <div>
      <NavbarData />
      <br></br>
      <br></br>
      <Widgets />
    </div>
  );
}

export default withRouter(Dashboard);
