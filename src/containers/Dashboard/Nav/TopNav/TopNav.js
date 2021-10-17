import React, { useEffect } from "react";
import classes from "./TopNav.module.css";
import { withRouter } from "react-router-dom";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";
// import { useEffect } from "react";
const TopNav = (props) => {
  useEffect(() => {
    // const tabs = document.querySelectorAll("ul")[0].childNodes;
    // console.log(tabs);
  }, []);
  const redirect = (path) => {
    // console.log("redirect");
    props.history.push({ pathname: path });
  };

  return (
    <div className={classes.navigation_container}>
      <ul className={classes.unordered_list}>
        <h2>{props.title}</h2>
      </ul>
      <ul className={classes.unordered_list} id="ul-tabs">
        <li onClick={() => redirect("/")}>home</li>
        <li onClick={() => redirect("/profile")}>profile</li>
        {/* <li onClick={() => redirect("/auth")}>login</li> */}
        <li onClick={props.logout}>Logout</li>
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(TopNav));
