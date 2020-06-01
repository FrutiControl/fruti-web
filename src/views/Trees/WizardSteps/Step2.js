import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

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
  }
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { lat: 4.6493355330066, lng: -74.395033434259 }
    };
  }
  sendState() {
    return this.state;
  }
  isValidated() {
    return true;
  }
  componentWillMount() {
    this.props.resetUpdate();
  }
  markerRef = React.createRef();
  render() {
    const { classes } = this.props;
    const SatelliteMap = withScriptjs(
      withGoogleMap(() => (
        <GoogleMap
          defaultZoom={20}
          mapTypeId={"hybrid"}
          defaultCenter={{ lat: 4.6493355330066, lng: -74.395033434259 }}
          defaultOptions={{
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: "hybrid"
          }}
          center={this.state.location}
        >
          <Marker
            ref={this.markerRef}
            draggable
            position={this.state.location}
            onDragEnd={() =>
              this.setState({
                location: this.markerRef.current.getPosition()
              })
            }
          />
        </GoogleMap>
      ))
    );
    return (
      <div>
        <h4 className={classes.infoText}> Ubicación del Árbol </h4>
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
                    height: `550px`,
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
const mapStateToProps = state => {
  return {
    update: state.updates,
    trees: state.trees,
    farms: state.farms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetUpdate: () => dispatch({ type: "RESET_UPDATE", id: 0 })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step2));
