import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress'

// @material-ui/icons
import Email from "@material-ui/icons/Email";


import {auth} from "actions";

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
import SnackbarAlert from "../../components/Snackbar-alert/Snackbar-alert";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

function LoginPage(props) {
    const classes = useStyles();
    const [helperEmail, setHelperEmail] = React.useState("");
    const [helperPass, setHelperPass] = React.useState("");
    const [EmailState, setEmailState] = React.useState("");
    const [PasswordState, setPasswordState] = React.useState("");
    const [showWarning, setShowWarning] = React.useState({open: false, messageWarning: ""});
    const [showError, setShowError] = React.useState({open: false, messageError: ""});
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [username, setUsername] = React.useState("");
    const [password, setPass] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [loginTries, setLoginTries] = React.useState(1);
    const wrapper = React.createRef();
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const checkForm = () => {
        setLoginTries(loginTries+1);
        return EmailState === "success" && PasswordState === "success";
    }
    const handleCloseAlerts = (event, reason) => {
        if (reason === 'clickaway') return;
        setShowError({open: false, messageError: ""});
        setShowWarning({open: false, messageWarning: ""});
        setShow(false);
    };
    const handleCloseBackdrop = (event, reason) => {
        if (reason === 'clickaway') return;
        setShow(false);
    };
    const handleEmail = (event)=>{
        if (event.target.value === "") {
            setHelperEmail("Ingrese su correo");
            setEmailState("error");

        } else {
            setUsername(event.target.value);
            setEmailState("success");
            setHelperEmail("");
        }
    };
    const handlePass = (event)=>{
        if (event.target.value === "") {
            setHelperPass("Ingrese su contraseña");
            setPasswordState("error");

        } else {
            setPass(event.target.value);
            setPasswordState("success");
            setHelperPass("");
        }
    };
    const handleError = () =>{
        if (authError && loginTries>=1) {
            setShowWarning({open: false, messageWarning: ""});
            setShowError({open: true, messageError: "Correo o contraseña incorrectos, intenta de nuevo."});
        } else {
            setShowError({open: false, messageError: ""});
        }
    };
    const handleWarning = () =>{
        setShowWarning({open: true, messageWarning: "Verifique la información ingresada para continuar."});
        setShowError({open: false, messageError: ""});
    };
    React.useEffect(() => {
        if(props.errors[0]===undefined){
            setAuthError(false);
        }
        else{
            if (props.errors[0].message==="Invalid token." ){
                setAuthError(false);
                setAuthError(true);
            }
            else{
                setAuthError(true);
                handleError();
            }

        }
    }, [props.errors[0]])
    if (props.isAuthenticated) return <Redirect to="/admin/dashboard"/>;
    return (
        <div>
            <AuthNavbar brandText={"FrutiControl"}/>
            <div className={classes.wrapper} ref={wrapper}>
                <Parallax
                    className={classes.fullPage}
                    filter
                    image={require("assets/img/login.jpg")}>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={6} md={4}>
                                <form>
                                    <Card login className={classes[cardAnimaton]}>
                                        <CardHeader
                                            className={`${classes.cardHeader} ${classes.textCenter}`}
                                            color="primary">
                                            <h4 className={classes.cardTitle}>Inicio de sesión</h4>
                                        </CardHeader>
                                        <CardBody>
                                            <CustomInput
                                                success={EmailState === "success"}
                                                error={EmailState === "error"}
                                                labelText="Correo"
                                                id="email"
                                                value="fffff"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                helperText={helperEmail}
                                                inputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputAdornmentIcon}/>
                                                        </InputAdornment>
                                                    ),
                                                    type: "email",
                                                    onChange: e => {
                                                        handleEmail(e);
                                                    }
                                                }}/>
                                            <CustomInput
                                                success={PasswordState === "success"}
                                                error={PasswordState === "error"}
                                                labelText="Contraseña"
                                                id="password"
                                                required
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                helperText={helperPass}
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
                                                        handlePass(e);
                                                    }
                                                }}/>
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
                                                    if (checkForm()) {
                                                        setShow(!show);
                                                        props.login(username, password);
                                                    } else {
                                                        handleWarning();
                                                    }

                                                }}>
                                                Iniciar
                                            </Button>
                                        </CardFooter>
                                        <Backdrop className={classes.backdrop} open={show} transitionDuration={1000}
                                                  onTransitionEnd={handleCloseBackdrop}>
                                            <CircularProgress size={100} color="secondary"/>
                                        </Backdrop>
                                    </Card>
                                </form>
                                <SnackbarAlert open={showWarning.open} duration={2000} severity="warning" message= {showWarning.messageWarning}
                                closeProps={{
                                    onClose : e =>{
                                        handleCloseAlerts(e);
                                    }
                                }}></SnackbarAlert>
                                <SnackbarAlert open={showError.open} duration={2000} severity="error" message= {showError.messageError}
                                closeProps={{
                                    onClose : e =>{
                                        handleCloseAlerts(e);
                                    }
                                }} ></SnackbarAlert>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <Footer white/>
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
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);