import config from "../config";
const base_url = config.base_url;

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: "USER_LOADING" });

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json"
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch(`${base_url}/users/user/`, { headers })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: "USER_LOADED", user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ username, password });

    return fetch(`${base_url}/users/login/`, { headers, body, method: "POST" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESSFUL", data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "LOGIN_FAILED", data: res.data });
          throw res.data;
        }
      });
  };
};
export const register = (username, password, firstName) => {
  return (dispatch, getState) => {
    return fetch(`${base_url}/users/register/`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        username: username,
        password: password,
        first_name: firstName
      })
    })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: "REGISTRATION_SUCCESSFUL", data: res.data });
          return res.data;
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "REGISTRATION_FAILED", data: res.data });
          throw res.data;
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch(`${base_url}/auth/logout/`, {
      headers,
      body: "",
      method: "POST"
    })
      .then(res => {
        if (res.status === 204) {
          return { status: res.status, data: {} };
        } else if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          dispatch({ type: "LOGOUT SUCCESSFUL" });
          return res.data;
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};
