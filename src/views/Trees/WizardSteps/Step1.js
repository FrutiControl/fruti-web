import React from "react";
import { Redirect } from "react-router-dom";
import { farms, trees } from "actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle";
import Button from "../../../components/CustomButtons/Button";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";

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
  },
  datePicker: {
    marginTop: "16px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.42857",
    textDecoration: "none",
    letterSpacing: "0",
    color: "#3c4858"
  },
  ...customSelectStyle
};

const fruit_types = [
  { value: "M", name: "Mango Tommy" },
  { value: "F", name: "Mango Farchild" },
  { value: "N", name: "Naranja" },
  { value: "D", name: "Mandarina" },
  { value: "L", name: "Limón" },
  { value: "A", name: "Aguacate" },
  { value: "B", name: "Banano" }
];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specie: "",
      seed_date: "",
      farm: 0
    };
  }
  sendState() {
    return this.state;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    return value.length >= length;
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
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  componentDidMount() {
    this.props.fetchFarms();
  }
  render() {
    const { classes } = this.props;
    const fruit_items = fruit_types.map((fruit_type, key) => {
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
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Información del nuevo árbol</h4>
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
              value={this.state.specie}
              onChange={this.handleSimple}
              inputProps={{
                name: "specie",
                id: "specie"
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
              Seleccione granja a la que pertenece (requerido)
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
        <GridItem xs={8}>
          <Datetime
            closeOnSelect
            editable={false}
            dateFormat={"YYYY-MM-DD"}
            className={classes.datePicker}
            timeFormat={false}
            onChange={date =>
              this.setState({ seed_date: date.format("YYYY-MM-DD") })
            }
            inputProps={{
              placeholder: "Seleccione fecha de siembra del árbol (requerido)",
              style: style.datePicker
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};
const mapStateToProps = state => {
  return {
    farms: state.farms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFarms: () => dispatch(farms.fetchFarms()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step1));
