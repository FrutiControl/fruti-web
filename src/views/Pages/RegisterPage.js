import React from "react";

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

export default function RegisterPage() {
  const [checked, setChecked] = React.useState([]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const wrapper = React.createRef();
  const classes = useStyles();
  return (
    <div>
      <AuthNavbar brandText={"Login page"} />
      <div className={classes.wrapper} ref={wrapper}>
        <Parallax
          className={classes.fullPage}
          filter
          image={require("assets/img/login.jpg")}
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
                              placeholder: "Nombre"
                            }}
                          />
                          <CustomInput
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
                              placeholder: "Correo"
                            }}
                          />
                          <CustomInput
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
                              placeholder: "Contraseña"
                            }}
                          />
                          <FormControlLabel
                            classes={{
                              root: classes.checkboxLabelControl,
                              label: classes.checkboxLabel
                            }}
                            control={
                              <Checkbox
                                tabIndex={-1}
                                onClick={() => handleToggle(1)}
                                checkedIcon={
                                  <Check className={classes.checkedIcon} />
                                }
                                icon={
                                  <Check className={classes.uncheckedIcon} />
                                }
                                classes={{
                                  checked: classes.checked,
                                  root: classes.checkRoot
                                }}
                              />
                            }
                            label={
                              <span>
                                Acepto los{" "}
                                <a href="#pablo">términos y condiciones</a>.
                              </span>
                            }
                          />
                          <div className={classes.center}>
                            <Button round color="primary">
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
}
