import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Datetime from "react-datetime";
import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle";

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
  label: {
    fontFamily: "Helvetica",
    fontSize: "15px",
    color: "#3c4858"
  },
  ...customSelectStyle
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelectTipoVendido: "",
      simpleSelectSubTipo: "",
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
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  // function that verifies if a string has a given length or not
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
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
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Ingrese la información correspondiente para crear su nuevo ingreso.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Seleccione subtipo de actividad
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelectSubTipo}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelectSubTipo",
                id: "simpleSelectSubTipo"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Subtipo de actividad
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                Subtipo 1
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                Subtipo 2
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={8}>
          <Datetime
            className={classes.datePicker}
            timeFormat={false}
            inputProps={{
              placeholder: "Seleccione fecha de ingreso",
              style: style.datePicker
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            success={this.state.firstnameState === "success"}
            error={this.state.firstnameState === "error"}
            labelText={
              <span>
                Cantidad de fruto vendida <small>(requerido)</small>
              </span>
            }
            id="firstname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "firstname", "length", 3)
            }}
          />
          <CustomInput
            success={this.state.lastnameState === "success"}
            error={this.state.lastnameState === "error"}
            labelText={
              <span>
                Precio por Unidad <small>(requerido)</small>
              </span>
            }
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "lastname", "length", 3)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <h4> Total: </h4>
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
