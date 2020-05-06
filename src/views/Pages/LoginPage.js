import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

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
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const wrapper = React.createRef();
  const classes = useStyles();
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
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
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
                          autoComplete: "off"
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button color="primary" simple size="lg" block>
                        <Link to ='/admin/dashboard' > Iniciar </Link>
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
}
