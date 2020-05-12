import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import CreateIcon from "@material-ui/icons/Create";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};
const SatelliteMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={15}
      mapTypeId={"hybrid"}
      defaultCenter={{ lat: 4.6493355330066, lng: -74.395033434259 }}
      defaultOptions={{
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: "hybrid"
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      email: "",
      emailState: ""
    };
  }
  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.firstnameState === "success" &&
      this.state.lastnameState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.firstnameState !== "success") {
        this.setState({ firstnameState: "error" });
      }
      if (this.state.lastnameState !== "success") {
        this.setState({ lastnameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Datos de la Granja Nueva</h4>
        </GridItem>
        <GridItem xs={10}>
          <CustomInput
            success={this.state.firstnameState === "success"}
            error={this.state.firstnameState === "error"}
            labelText={
              <span>
                Nombre de la granja <small>(requerido)</small>
              </span>
            }
            id="farmname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "farmname", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <CreateIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </GridItem>
        <GridItem xs={10}>
          <h5>
            En el siguiente mapa debe formar la zona donde se encuentra su
            granja, mediante clicks que se unen para formar un polígono. Para
            completar la figura, de click en el punto inicial.
          </h5>
        </GridItem>
        <GridItem xs={10}>
          <SatelliteMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyXNgKS0gtLrB611nCh-J3gVqu7v_via0"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `350px`,
                  borderRadius: "6px",
                  overflow: "hidden"
                }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
