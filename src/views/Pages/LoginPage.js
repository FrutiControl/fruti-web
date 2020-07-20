import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

import { auth } from "actions";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Landing/Parallax/Parallax";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [username, setUsername] = React.useState("");
  const [password, setPass] = React.useState("");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const wrapper = React.createRef();
  const classes = useStyles();
  if (props.isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }
  return (
    <div>
      <AuthNavbar brandText={"Página de inicio"} />
      <div className={classes.wrapper} ref={wrapper}>
        <Parallax
          className={classes.fullPage}
          filter
          image={require("assets/img/login.jpg")}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                <form>
                  <Card login className={classes[cardAnimaton]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color="primary"
                    >
                      <h4 className={classes.cardTitle}>Inicio de sesión</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Correo"
                        id="email"
                        value="fffff"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          type: "email",
                          onChange: e => {
                            setUsername(e.target.value);
                          }
                        }}
                      />
                      <CustomInput
                        labelText="Contraseña"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          type: "password",
                          autoComplete: "off",
                          onChange: e => {
                            setPass(e.target.value);
                          }
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button
                        id="loginBtn"
                        color="primary"
                        simple
                        size="lg"
                        block
                        onClick={e => {
                          e.preventDefault();
                          props.login(username, password);
                          if (
                            props.errors.length > 0 &&
                            props.errors[0].field === "non_field_errors"
                          ) {
                            console.log(props.errors);
                          }
                        }}
                      >
                        Iniciar
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
          </div>
          <Footer white />
        </Parallax>
      </div>
    </div>
  );
});
