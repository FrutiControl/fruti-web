import React from "react";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import { auth } from "actions";
import frutiApp from "reducers";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import LandingPage from "views/LandingPage/LandingPage";
import LoginPage from "views/Pages/LoginPage";
import RegisterPage from "views/Pages/RegisterPage";
import ErrorPage from "./views/Pages/ErrorPage";

const hist = createBrowserHistory();
let store = createStore(frutiApp, applyMiddleware(thunk));

const PrivateRoute = ({ Component: ChildComponent, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      this.props.auth.isAuthenticated ? (
        <ChildComponent {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class RootContainerComponent extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <PrivateRoute path="/admin" component={AdminLayout} />
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};
let RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById("root")
);
