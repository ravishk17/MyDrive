import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <div className={classes.form_submit}>
      <input
        type="submit"
        value={props.value}
        className={classes.submit}
        onClick={props.onClick}
      />
    </div>
  );
};
export default Button;
