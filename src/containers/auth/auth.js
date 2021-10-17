import classes from "./auth.module.css";
// import Dashboard from "../Dashboard/Dashboard";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import logo from "./l5.png";

const Auth = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const verifyInput = (email, password) => {
    if (validEmailRegex.test(email) && password.length >= 5) {
      return true;
    }
    if (!validEmailRegex.test(email)) {
      setEmailError("Invalid Email");
    }
    if (password.length < 5) {
      setPasswordError("Password too short. Can't be less than 5 characters");
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (emailError.length > 0 || passwordError.length > 0) {
      return;
    }
    if (verifyInput(enteredEmail, enteredPassword)) {
      // console.log("FORM SUBMITTED DEMO, I'm auth.js in containers/auth");
      props.onAuth(enteredEmail, enteredPassword);
      return;
    } else {
      console.log("Some error occured");
      return;
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const enterHandler = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (touched) {
      switch (name) {
        case "email":
          setEmailError(validEmailRegex.test(value) ? "" : "Invalid email");
          break;
        case "password":
          setPasswordError(
            value.length < 5
              ? "Password too short. Can't be less than 5 characters"
              : ""
          );
          break;
        default:
          return;
      }
    }
    switch (name) {
      case "email":
        setEnteredEmail(value);
        break;
      case "password":
        setEnteredPassword(value);
        break;
      default:
        return;
    }
  };
  return (
    <div className={classes.main_container}>
      <div
        className={classes.form_container}
        onKeyDown={(e) => enterHandler(e)}
      >
        <div className={classes.form_header}>
          <div className={classes.logo_container}>
            <img src={logo} alt="Logo" />
          </div>
          <span>Log in to your account</span>
        </div>
        <span className={classes.inline_error}>{props.error}</span>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          value={enteredEmail}
          onChange={handleChange}
          error={emailError}
        />
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={enteredPassword}
          onChange={handleChange}
          error={passwordError}
          showIcon={true}
          visible={showPassword}
          handleIcon={handleShowPassword}
        />
        <Button value="Login" onClick={handleSubmit} />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
