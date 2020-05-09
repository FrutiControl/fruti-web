import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import Datetime from "react-datetime";
import CustomInput from "../../../components/CustomInput/CustomInput";

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
  datePicker: {
    marginTop: "16px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.42857",
    textDecoration: "none",
    letterSpacing: "0",
    color: "#3c4858"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelectTipoActividad: "",
      simpleSelectSubTipo: "",
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
        <h4 className={classes.infoText}>
          Ingrese la información correspondiente para crear su nuevo gasto.
        </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Seleccione tipo de actividad
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.simpleSelectTipoActividad}
                onChange={this.handleSimple}
                inputProps={{
                  name: "simpleSelectTipoActividad",
                  id: "simpleSelectTipoActividad"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Tipo de actividad
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="2"
                >
                  Siembra
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="3"
                >
                  Fertilización
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="4"
                >
                  Fumigación
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="5"
                >
                  Riego
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="6"
                >
                  Poda
                </MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
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
          <GridItem xs={12} sm={8}>
            <Datetime
              timeFormat={false}
              inputProps={{
                placeholder: "Seleccione fecha de gasto",
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
                  Monto del gasto <small>(requerido)</small>
                </span>
              }
              id="montogasto"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "montogasto", "length", 3)
              }}
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
