import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return <div className={classes.modal_container}>{props.children}</div>;
};
export default Modal;
