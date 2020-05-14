import React from "react";
import { connect } from "react-redux";
import { auth } from "actions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

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
)(function UserProfile() {
  const classes = useStyles();
  return (
    <div id="profile">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Mi Perfil - <small>Datos del perfil</small>
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify={"center"}>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Nombre"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Correo electrónico"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Ciudad o Municipio"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Departamento"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="País"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <h4> Preferencias de usuario </h4>
                  <CustomInput
                    labelText="Valor del jornal"
                    id="jornal"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button color="rose" className={classes.updateProfileButton}>
                Actualizar perfil
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}></GridItem>
      </GridContainer>
    </div>
  );
});
