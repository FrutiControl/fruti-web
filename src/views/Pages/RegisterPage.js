import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "actions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Landing/Parallax/Parallax";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password, firstName) =>
      dispatch(auth.register(username, password, firstName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function RegisterPage(props) {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPass] = React.useState("");
  const [com_pass, setConPass] = React.useState("");
  const [NameState, setNameState] = React.useState("");
  const [EmailState, setEmailState] = React.useState("");
  const [PasswordState, setPasswordState] = React.useState("");
  const [ConfirmPasswordState, setConfirmPasswordState] = React.useState("");
  const [valid, setValid] = React.useState(false);
  const wrapper = React.createRef();
  const classes = useStyles();
  if (props.isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }
  const checkForm = () => {
    return (
      NameState === "success" &&
      EmailState === "success" &&
      PasswordState === "success" &&
      ConfirmPasswordState === "success"
    );
  };
  return (
    <div>
      <AuthNavbar brandText={"Registro de usuarios"} />
      <div className={classes.wrapper} ref={wrapper}>
        <Parallax
          className={classes.fullPage}
          filter
          image={require("assets/img/register.jpg")}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Registro</h2>
                  <CardBody>
                    <GridContainer className={classes.justify} justify="center">
                      <GridItem xs={12} sm={12} md={5}>
                        <InfoArea
                          title="Presupuesto"
                          description="Generación de presupuesto estimado con base en cifras oficiales para conocer sus ingresos y gastos antes de ejecutar actividades."
                          icon={LocalAtmIcon}
                          iconColor="success"
                        />
                        <InfoArea
                          title="Alertas"
                          description="Generación de alertas de limpieza para que el usuario tenga en cuenta el procedimiento antes de pasar a otras etapas. Con el fin
                    de contar con un cultivo sano y prevenir factores de riesgo."
                          icon={NotificationsActiveIcon}
                          iconColor="warning"
                        />
                        <InfoArea
                          title="Usuarios"
                          description="Los agricultores de árboles frutales cuyos cultivos contemplan el mango, el banano, los cítricos y el aguacate pueden realizar seguimiento
                    de sus actividades ya que el sistema maneja información precisa de dichos tipos de fruto."
                          icon={Group}
                          iconColor="info"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={8} md={5}>
                        <div className={classes.center}>
                          <Button justIcon round color="twitter">
                            <i className="fas fa-lemon" />
                          </Button>
                          {` `}
                          <Button justIcon round color="linkedin">
                            <i className="fas fa-seedling" />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook">
                            <i className="fas fa-tree" />
                          </Button>
                          {` `}
                          <h4 className={classes.socialTitle}>
                            Registrate aquí
                          </h4>
                        </div>
                        <form className={classes.form}>
                          <CustomInput
                            success={NameState === "success"}
                            error={NameState === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Face
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              placeholder: "Nombre",
                              onChange: e => {
                                if (e.target.value.length >= 5) {
                                  setName(e.target.value);
                                  setNameState("success");
                                } else setNameState("error");
                              }
                            }}
                          />
                          <CustomInput
                            success={EmailState === "success"}
                            error={EmailState === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Email
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              onChange: e => {
                                let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if (emailRex.test(e.target.value)) {
                                  setEmailState("success");
                                  setUsername(e.target.value);
                                } else setEmailState("error");
                              },
                              placeholder: "Correo",
                              type: "email"
                            }}
                          />
                          <CustomInput
                            id="password"
                            success={PasswordState === "success"}
                            error={PasswordState === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Contraseña",
                              type: "password",
                              onChange: e => {
                                let passRex = /^(?=.*[A-Z][a-z])(?=.*\d)[A-Za-z\d^a-zA-Z0-9].{8,25}$/;
                                if (passRex.test(e.target.value)) {
                                  setPasswordState("success");
                                  setPass(e.target.value);
                                } else setPasswordState("error");
                              }
                            }}
                          />
                          <CustomInput
                            id="confirmacion"
                            success={ConfirmPasswordState === "success"}
                            error={ConfirmPasswordState === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Confirmar Contraseña",
                              type: "password",
                              onChange: e => {
                                if (password === e.target.value) {
                                  setConfirmPasswordState("success");
                                  setConPass(e.target.value);
                                } else setConfirmPasswordState("error");
                              }
                            }}
                          />
                          <div className={classes.center}>
                            <Button
                              round
                              color="primary"
                              onClick={e => {
                                e.preventDefault();
                                if (checkForm()) {
                                  props.register(username, password, name);
                                  alert(
                                    "Su usuario fue registrado exitosamente! Click en aceptar para continuar."
                                  );
                                } else {
                                  alert(
                                    "Verifique la información ingresada para continuar"
                                  );
                                }
                              }}
                            >
                              Registrarme
                            </Button>
                          </div>
                        </form>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer white />
        </Parallax>
      </div>
    </div>
  );
});
