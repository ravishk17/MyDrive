import React from "react";
import classes from "./Input.module.css";
import visible from "./visible.svg";
import invisible from "./invisible.svg";
const Input = (props) => {
  return (
    <div className={classes.form_inputs}>
      <div className={classes.input_container}>
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        {props.showIcon === true ? (
          <div className={classes.icon} onClick={props.handleIcon}>
            <div>
              {props.visible ? (
                <img src={invisible} alt="hide" />
              ) : (
                <img src={visible} alt="show" />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <span className={classes.inline_error}>{props.error}</span>
    </div>
  );
};
export default Input;
