import React from "react";
import TopNav from "./Nav/TopNav/TopNav";
import Aux from "../../hoc/Auxy";
const Dashboard = (props) => {
  return (
    <Aux>
      <TopNav title={props.title} />
      <div>{props.children}</div>
    </Aux>
  );
};
export default Dashboard;
