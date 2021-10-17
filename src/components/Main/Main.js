import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "../../containers/auth/auth";
import Home from "../../containers/Home/Home";
import Profile from "../../containers/Profile/Profile";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const Main = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  if (props.isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/">
        <Auth />
      </Route>
    </Switch>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
