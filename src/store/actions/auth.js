import * as actionTypes from "./actionTypes";
import endpoints from "./endpoints";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    username: username,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    fetch(endpoints.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          const error = {
            messsage: "Access denied!!! Wrong credentials",
          };
          error.statusCode = 401;
          throw error;
        }
        return response.json();
      })
      .then((response) => {
        // console.log("response = ", response);
        // console.log("check1");
        const expirationDate = new Date(
          new Date().getTime() + response.expiresIn * 1000
        );
        // console.log("check3");
        localStorage.setItem("token", response.idToken);
        // console.log("check4");
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.localId);
        localStorage.setItem("username", response.username);
        dispatch(
          authSuccess(response.idToken, response.localId, response.username)
        );
        dispatch(checkAuthTimeout(response.expiresIn));
        // console.log("check2");
      })
      .catch((err) => {
        console.log(err.messsage, "[err]");
        if (err.messsage === undefined) {
          err.messsage = "Server not responding. Please try again later";
        }
        dispatch(authFail(err.messsage));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        dispatch(authSuccess(token, userId, username));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
