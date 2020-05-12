import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
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
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
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
class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}> Ubicación del Nuevo Árbol </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={9}>
            <h5>
              En el siguiente mapa debe indicar el punto donde se encuentra el
              árbol en su granja.
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
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step2);
