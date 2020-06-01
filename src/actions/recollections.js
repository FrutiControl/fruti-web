import config from "../config";
const base_url = config.base_url;

export const fetchRecollections = () => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`${base_url}/app/recollections/`, { headers })
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
          return dispatch({ type: "FETCH_RECOLLECTIONS", recollections: res.data });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};

export const fetchRecollection = id => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`${base_url}/app/recollections/${id}/`, { headers })
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
          return dispatch({ type: "FETCH_RECOLLECTION", recollection: res.data });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};

export const addRecollection = (start_date, end_date, farm, type, trees) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch(`${base_url}/app/recollections/`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        farm: farm,
        trees: trees,
        type: type
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
        if (res.status === 201) {
          return dispatch({ type: "ADD_RECOLLECTION", note: res.data });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};

export const updateRecollection = id => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`${base_url}/app/recollections/${id}/`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers,
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({})
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
          return dispatch({
            type: "UPDATE_RECOLLECTION",
            note: res.data,
            index: id
          });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};

export const deleteRecollection = id => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`${base_url}/app/recollections/${id}/`, {
      headers,
      method: "DELETE"
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
          return dispatch({ type: "DELETE_RECOLLECTION", index: id });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      });
  };
};
