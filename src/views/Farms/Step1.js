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
  Polygon,
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
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      path: [
        { lat: 4.644048217838231, lng: -74.39119476824999 },
        { lat: 4.642646350679112, lng: -74.38995894044638 },
        { lat: 4.643689981727881, lng: -74.39001694321632 }
      ],
      center: { lat: 4.643689981727881, lng: -74.39001694321632 },
      nameState: ""
    };
  }
  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyLength(value, length) {
    return value.length >= length;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
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
    if (this.state.nameState === "success") {
      return true;
    } else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
    }
    return false;
  }
  polygonRef = React.createRef();
  render() {
    console.log(`CENTER ${JSON.stringify(this.state.center)}`);
    const SatelliteMap = withScriptjs(
      withGoogleMap(() => (
        <GoogleMap
          defaultZoom={20}
          mapTypeId={"hybrid"}
          defaultCenter={{ lat: 4.643689981727881, lng: -74.39001694321632 }}
          defaultOptions={{
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: "hybrid"
          }}
          center={this.state.center}
        >
          <Polygon
            ref={this.polygonRef}
            editable
            draggable
            path={this.state.path}
            onDragEnd={() => {
              let path_array = this.polygonRef.current.getPath().getArray();
              this.setState({
                path: path_array.map(latLng => {
                  return { lat: latLng.lat(), lng: latLng.lng() };
                }),
                center: {
                  lat: path_array[0].lat(),
                  lng: path_array[0].lng()
                }
              });
            }}
            onMouseUp={() => {
              let path_array = this.polygonRef.current.getPath().getArray();
              this.setState({
                path: path_array.map(latLng => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                  }),
                center: {
                  lat: path_array[0].lat(),
                  lng: path_array[0].lng()
                }
              });
            }}
          />
        </GoogleMap>
      ))
    );
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Datos de la Granja Nueva</h4>
        </GridItem>
        <GridItem xs={10}>
          <CustomInput
            success={this.state.nameState === "success"}
            error={this.state.nameState === "error"}
            labelText={
              <span>
                Nombre de la granja <small>(requerido)</small>
              </span>
            }
            id="name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "name", "length", 3),
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
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
