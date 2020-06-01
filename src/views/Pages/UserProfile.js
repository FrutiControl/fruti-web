import React from "react";
import { connect } from "react-redux";
import { auth, owner } from "actions";

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

function UserProfile(props) {
  const [user, setUser] = React.useState(props.user);
  React.useEffect(() => {
    setUser({ ...user, ...props.owner });
  }, [props.owner]);
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
                    id="first_name"
                    formControlProps={{
                      fullWidth: true,
                      onChange: e => {
                        setUser({ ...user, first_name: e.target.value });
                      }
                    }}
                    inputProps={{
                      defaultValue: user.first_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Correo electrónico"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                      onChange: e => {
                        setUser({
                          ...user,
                          username: e.target.value,
                          email: e.target.value
                        });
                      }
                    }}
                    inputProps={{
                      defaultValue: user.username
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Ciudad o Municipio"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                      onChange: e => {
                        setUser({ ...user, city: e.target.value });
                      }
                    }}
                    inputProps={{
                      defaultValue: props.owner.city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="Departamento"
                    id="department"
                    formControlProps={{
                      fullWidth: true,
                      onChange: e => {
                        setUser({ ...user, department: e.target.value });
                      }
                    }}
                    inputProps={{
                      defaultValue: props.owner.department
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <CustomInput
                    labelText="País"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                      onChange: e => {
                        setUser({ ...user, country: e.target.value });
                      }
                    }}
                    inputProps={{
                      defaultValue: props.owner.country
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <h4> Preferencias de usuario </h4>
                  <CustomInput
                    labelText="Valor del jornal"
                    id="jornal"
                    formControlProps={{
                      fullWidth: true,
                      onChange: e => {
                        setUser({ ...user, day_cost: e.target.value });
                      }
                    }}
                    inputProps={{
                      defaultValue: props.owner.day_cost
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button
                color="rose"
                className={classes.updateProfileButton}
                onClick={() => {
                  props.updateOwner(
                    user.country,
                    user.department,
                    user.city,
                    user.day_cost
                  );
                  props.updateUser(user.username, user.first_name);
                }}
              >
                Actualizar perfil
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    owner: state.owner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (username, first_name) => {
      return dispatch(auth.updateUser(username, first_name));
    },
    updateOwner: (country, department, city, day_cost) => {
      return dispatch(owner.updateOwner(country, department, city, day_cost));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
