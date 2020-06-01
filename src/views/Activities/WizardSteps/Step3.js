import React from "react";
import { farms } from "actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import {
  GoogleMap,
  Polygon,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Datetime from "react-datetime";
import moment from "moment";

const seedings = [
  { value: "M", name: "Mango Tommy" },
  { value: "F", name: "Mango Farchild" },
  { value: "N", name: "Naranja" },
  { value: "D", name: "Mandarina" },
  { value: "L", name: "Limón" },
  { value: "A", name: "Aguacate" },
  { value: "B", name: "Banano" }
];
const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
    fontSize: "16px"
  },
  label: {
    fontFamily: "Helvetica",
    fontSize: "15px",
    color: "#a8abae"
  },
  datePicker: {
    marginTop: "16px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.42857",
    textDecoration: "none",
    letterSpacing: "0"
  },
  ...customSelectStyle
};
class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      distance: 0,
      trees_quantity: 0,
      farm: "",
      path: [
        { lat: 4.644048217838231, lng: -74.39119476824999 },
        { lat: 4.642646350679112, lng: -74.38995894044638 },
        { lat: 4.643689981727881, lng: -74.39001694321632 }
      ],
      area: 0,
      type: "",
      center: { lat: 4.643689981727881, lng: -74.39001694321632 },
      work_cost: 0,
      tools_cost: 0,
      days: 0
    };
  }
  sendState() {
    return this.state;
  }
  verifyNumber(value, stateName) {
    if (Number(value) > 0) {
      this.setState({ [stateName]: Number(value) });
      return true;
    } else {
      this.setState({ [stateName]: 0 });
      return false;
    }
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  isValidated() {
    return true;
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
      case "number":
        if (this.verifyNumber(event.target.value, stateName))
          this.setState({ [stateName + "State"]: "success" });
        else this.setState({ [stateName + "State"]: "error" });
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  componentDidMount() {
    this.props.fetchFarms();
  }
  handleDays(start_date, end_date) {
    if (start_date && end_date) {
      this.setState(
        { days: moment(end_date).diff(start_date, "days") + 1 },
        () => {
          this.setState({
            work_cost: this.state.days * this.props.owner.day_cost
          });
        }
      );
    }
  }
  polygonRef = React.createRef();
  render() {
    const { classes } = this.props;
    console.log(`Tree_quantity: ${this.state.trees_quantity}`);
    console.log(`Tools_cost: ${this.state.tools_cost}`);
    const fruit_items = seedings.map((fruit_type, key) => {
      return (
        <MenuItem
          key={key}
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
          value={fruit_type.value}
        >
          {fruit_type.name}
        </MenuItem>
      );
    });
    const farms_items = this.props.farms.map((farm, key) => {
      return (
        <MenuItem
          key={key}
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
          value={farm.id}
        >
          {farm.name}
        </MenuItem>
      );
    });
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
              const google = window.google;
              let path_array = this.polygonRef.current.getPath().getArray();
              let bounds = new google.maps.LatLngBounds();
              this.polygonRef.current.getPath().forEach((element, index) => {
                bounds.extend(element);
              });
              this.setState(
                {
                  path: path_array.map(latLng => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                  }),
                  center: {
                    lat: bounds.getCenter().lat(),
                    lng: bounds.getCenter().lng()
                  },
                  area: google.maps.geometry.spherical.computeArea(path_array),
                  trees_quantity: Number(
                    google.maps.geometry.spherical.computeArea(path_array) /
                      Math.pow(Number(this.state.distance), 2)
                  ).toFixed(0)
                },
                () => {
                  this.setState({
                    tools_cost:
                      Number(this.state.trees_quantity).toFixed(0) * 10000
                  });
                }
              );
            }}
            onMouseUp={() => {
              const google = window.google;
              let bounds = new google.maps.LatLngBounds();
              this.polygonRef.current.getPath().forEach((element, index) => {
                bounds.extend(element);
              });
              let path_array = this.polygonRef.current.getPath().getArray();
              this.setState(
                {
                  path: path_array.map(latLng => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                  }),
                  center: {
                    lat: bounds.getCenter().lat(),
                    lng: bounds.getCenter().lng()
                  },
                  area: google.maps.geometry.spherical.computeArea(path_array),
                  trees_quantity: Number(
                    google.maps.geometry.spherical.computeArea(path_array) /
                      Math.pow(Number(this.state.distance), 2)
                  ).toFixed(0)
                },
                () => {
                  this.setState({
                    tools_cost:
                      Number(this.state.trees_quantity).toFixed(0) * 10000
                  });
                }
              );
            }}
          />
        </GoogleMap>
      ))
    );
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Si va a sembrar más de un árbol, seleccione la distancia entre los
            árboles a sembrar
          </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="specie" className={classes.selectLabel}>
              Seleccione tipo de árbol (requerido)
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.type}
              onChange={e => {
                this.setState({
                  type: e.target.value,
                  tools_cost:
                    Number(this.state.trees_quantity).toFixed(0) * 10000
                });
              }}
              inputProps={{
                name: "type",
                id: "type"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Tipo de árbol
              </MenuItem>
              {fruit_items}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="farm" className={classes.selectLabel}>
              Seleccione granja en la que va a sembrar (requerido)
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.farm}
              onChange={this.handleSimple}
              inputProps={{
                name: "farm",
                id: "farm"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Granja
              </MenuItem>
              {farms_items}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <Datetime
            closeOnSelect
            editable={false}
            dateFormat={"YYYY-MM-DD"}
            className={classes.datePicker}
            timeFormat={false}
            onChange={date => {
              this.setState({
                start_date: date.format("YYYY-MM-DD")
              });
              this.handleDays(date, this.state.end_date);
            }}
            inputProps={{
              placeholder:
                "Seleccione fecha de inicio de la actividad (requerido)",
              style: style.datePicker
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <Datetime
            closeOnSelect
            editable={false}
            dateFormat={"YYYY-MM-DD"}
            className={classes.datePicker}
            timeFormat={false}
            onChange={date => {
              this.setState({
                end_date: date.format("YYYY-MM-DD")
              });
              this.handleDays(this.state.start_date, date);
            }}
            isValidDate={currentDate => {
              return currentDate.isAfter(this.state.start_date);
            }}
            inputProps={{
              placeholder:
                "Seleccione fecha de fin de la actividad (requerido)",
              style: style.datePicker
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            className={classes.datePicker}
            labelText="Distancia (metros)"
            id="distance"
            formControlProps={{
              fullWidth: true,
              style: { ...style.datePicker, margin: "0", paddingTop: "10px" }
            }}
            inputProps={{
              onChange: event => {
                this.setState(
                  {
                    distance: event.target.value,
                    trees_quantity: Number(
                      this.state.area / Math.pow(Number(event.target.value), 2)
                    )
                  },
                  () => {
                    this.setState({
                      tools_cost:
                        Number(this.state.trees_quantity).toFixed(0) * 10000
                    });
                  }
                );
              },
              style: {
                ...style.datePicker,
                margin: "0",
                paddingTop: "10px"
              }
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            className={classes.datePicker}
            labelText="Costos estimados de los árboles (editable)"
            id="tools_cost"
            formControlProps={{
              fullWidth: true,
              style: { ...style.datePicker, margin: "0", paddingTop: "10px" }
            }}
            inputProps={{
              onChange: event => {
                this.setState({
                  tools_cost: Number(event.target.value)
                });
              },
              style: { ...style.datePicker, margin: "0", paddingTop: "10px" },
              value: this.state.tools_cost ? this.state.tools_cost : 0
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            className={classes.datePicker}
            labelText="Costos estimados de mano de obra (editable)"
            id="work_cost"
            formControlProps={{
              fullWidth: true,
              style: { ...style.datePicker, margin: "0", paddingTop: "10px" }
            }}
            inputProps={{
              onChange: event => {
                this.setState({
                  work_cost: Number(event.target.value)
                });
              },
              style: { ...style.datePicker, margin: "0", paddingTop: "10px" },
              value: this.state.work_cost
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <h5 className={classes.infoText}>
            Total de árboles que puede sembrar en el polígono:
            {` ${Number(this.state.trees_quantity).toFixed(0)} árboles`}
          </h5>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <h5 className={classes.infoText}>
            Área del polígono:
            {` ${Number(this.state.area).toFixed(0)} metros cuadrados`}
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

Step3.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    farms: state.farms,
    owner: state.owner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFarms: () => dispatch(farms.fetchFarms())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step3));
