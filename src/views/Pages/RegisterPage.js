import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "actions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/icons
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import {Visibility, VisibilityOff} from "@material-ui/icons";
// import LockOutline from "@material-ui/icons/LockOutline";

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

function RegisterPage(props) {
  const [helperName, setHelperName] = React.useState("");
  const [helperEmail, setHelperEmail] = React.useState("");
  const [helperPass, setHelperPass] = React.useState("");
  const [helperConfirmPass, setHelperConfirmPass] = React.useState("");
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPass] = React.useState("");
  const [NameState, setNameState] = React.useState("");
  const [EmailState, setEmailState] = React.useState("");
  const [PasswordState, setPasswordState] = React.useState("");
  const [ConfirmPasswordState, setConfirmPasswordState] = React.useState("");
  const [registerTries, setRegisterTries] = React.useState(0);
  const [registerError, setRegisterError] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState({
    open:false,
    title: '',
    content: '',
  });
  const [valuesPass, setValuesPass] = React.useState({
    password: '',
    showPassword: false,
    type: 'password',
  });
  const wrapper = React.createRef();
  const checkForm = () => {
    setRegisterTries(registerTries+1);
    return (
        NameState === "success" &&
        EmailState === "success" &&
        PasswordState === "success" &&
        ConfirmPasswordState === "success"
    );
  };
  const classes = useStyles();
  const handleClickShowPassword = () => {
    if(valuesPass.type === "text")
      setValuesPass({ password: password, showPassword: !valuesPass.showPassword, type: "password" });
    else
      setValuesPass({ password: password, showPassword: !valuesPass.showPassword, type: "text" });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCloseDialog = () => {
    setShowDialog({open: false, title: '',content: '' });
  };
  const handleError = () =>{
    setRegisterError(true);
    if (registerError && registerTries>0) {
      setShowDialog({open: true, title: 'Error al hacer el registro ',content: 'Verifique la información suministrada para continuar.' });
    }
  };
  const handleSuccess = () =>{
    if(registerError===false){
      setShowDialog({open: true, title: 'Registro exitoso ',content: 'Su usuario fue registrado exitosamente! Click en aceptar para continuar.' });
    }
  };
  React.useEffect(() => {
      handleError();
  }, [props.errors[0]])
  if (props.isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }

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
                            helperText={helperName}
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
                                  setHelperName("");
                                  setName(e.target.value);
                                  setNameState("success");
                                } else {
                                  setHelperName("Ingrese nombre completo");
                                  setNameState("error");
                                }
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
                            helperText={helperEmail}
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
                                  setHelperEmail("");
                                  setUsername(e.target.value);
                                } else{
                                  setHelperEmail("Correo invalido.");
                                  setEmailState("error");
                                }
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
                            helperText={helperPass}
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
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <IconButton className={classes.inputAdornmentIcon}
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}
                                  >
                                    {valuesPass.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                              placeholder: "Contraseña",
                              type: valuesPass.type,
                              onChange: e => {
                                let passRex = /^(?=.*[A-Z][a-z])(?=.*\d)[A-Za-z\d^a-zA-Z0-9].{8,25}$/;
                                if (passRex.test(e.target.value)) {
                                  setPasswordState("success");
                                  setHelperPass("");
                                  setPass(e.target.value);
                                } else{
                                  setPasswordState("error");
                                  setHelperPass("Contraseña debe contener: Al menos una letra mayuscula al principio, al menos un numero y de minimo 8 caracteres y maximo 26 (Ejemplo123).")
                                }
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
                            helperText={helperConfirmPass}
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
                              type: valuesPass.type,
                              onChange: e => {
                                if (password === e.target.value) {
                                  setConfirmPasswordState("success");
                                  setHelperConfirmPass("Contraseñas coinciden");
                                } else{
                                  setConfirmPasswordState("error");
                                  setHelperConfirmPass("Contraseñas NO coinciden");
                                }
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
                                  handleSuccess();
                                } else {
                                  setShowDialog({open: true, title: 'No es posible continuar con el registro ',content: 'Verifique la información suministrada para continuar.' });
                                }
                              }}
                            >
                              Registrarme
                            </Button>
                            <Dialog
                                open={showDialog.open}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">{showDialog.title}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  {showDialog.content}
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                                  Aceptar
                                </Button>
                              </DialogActions>
                            </Dialog>
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
}
const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
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
)(RegisterPage);