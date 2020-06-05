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
const activities = [
  { value: "P", name: "Poda" },
  { value: "F", name: "Fertilización" },
  { value: "U", name: "Fumigación" },
  { value: "S", name: "Siembra" },
  { value: "R", name: "Riego" },
  { value: "H", name: "Recolección" }
];
const prunes = [
  { value: "P1", name: "Sanitaria" },
  { value: "P2", name: "Formación" },
  { value: "P3", name: "Mantenimineto" },
  { value: "P4", name: "Limpieza" }
];
const fertilizations = [
  { value: "F1", name: "Crecimineto" },
  { value: "F2", name: "Producción" },
  { value: "F3", name: "Mantenimiento" }
];
const fumigations = [
  { value: "U1", name: "Insectos" },
  { value: "U2", name: "Hongos" },
  { value: "U3", name: "Hierba" },
  { value: "U4", name: "Ácaros" },
  { value: "U5", name: "Peste" }
];
const waterings = [
  { value: "R2", name: "Manual" },
  { value: "R3", name: "Sistema" }
];
const seedings = [
  { value: "S1", name: "Mango Tommy" },
  { value: "S2", name: "Mango Farchil" },
  { value: "S3", name: "Naranja" },
  { value: "S4", name: "Aguacate" },
  { value: "S5", name: "Mandarina" },
  { value: "S6", name: "Limón" },
  { value: "S7", name: "Banano" }
];
const recollections = [
  { value: "S1", name: "Mango Tommy" },
  { value: "S2", name: "Mango Farchil" },
  { value: "S3", name: "Naranja" },
  { value: "S4", name: "Aguacate" },
  { value: "S5", name: "Mandarina" },
  { value: "S6", name: "Limón" },
  { value: "S7", name: "Banano" }
];

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: "",
      outcome_date: "",
      value: 0,
      out_type: "",
      activity: "",
      act_type: "",
      valueState: "",
      act_typesItems: []
    };
  }
  sendState() {
    return this.state;
  }
  handleActivity = event => {
    this.setState({ activity: event.target.value }, () => {
      switch (event.target.value) {
        case "F":
          this.setState({ act_typesItems: fertilizations });
          break;
        case "U":
          this.setState({ act_typesItems: fumigations });
          break;
        case "P":
          this.setState({ act_typesItems: prunes });
          break;
        case "R":
          this.setState({ act_typesItems: waterings });
          break;
        case "S":
          this.setState({ act_typesItems: seedings });
          break;
        case "H":
          this.setState({ act_typesItems: recollections });
          break;
      }
    });
  };
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
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
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
  isValidated() {
    if (this.state.ValueState === "success") {
      return true;
    } else {
      if (this.state.unit_valueState !== "success") {
        this.setState({ unit_valueState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    const activities_items = activities.map((act_type, key) => {
      return (
        <MenuItem
          key={key}
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
          value={act_type.value}
        >
          {act_type.name}
        </MenuItem>
      );
    });
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
                Seleccione la actividad <small>(requerido)</small>
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.activity}
                onChange={this.handleActivity}
                inputProps={{
                  name: "activity",
                  id: "activity"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Actividad
                </MenuItem>
                {activities_items}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Seleccione el tipo de la actividad <small>(requerido)</small>
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.act_type}
                onChange={this.handleSimple}
                inputProps={{
                  name: "act_type",
                  id: "act_type"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Tipo de la actividad
                </MenuItem>
                {this.state.act_typesItems.map((act_type, key) => {
                  return (
                    <MenuItem
                      key={key}
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={act_type.value}
                    >
                      {act_type.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Seleccione el tipo de gasto <small>(requerido)</small>
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.out_type}
                onChange={this.handleSimple}
                inputProps={{
                  name: "out_type",
                  id: "out_type"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Tipo del gasto
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="M"
                >
                  Materiales
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="O"
                >
                  Mano de obra
                </MenuItem>
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
              onChange={date =>
                this.setState({ outcome_date: date.format("YYYY-MM-DD") })
              }
              inputProps={{
                placeholder: "Seleccione fecha de gasto (requerido)",
                style: style.datePicker
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              success={this.state.valueState === "success"}
              error={this.state.valueState === "error"}
              labelText={
                <span>
                  Monto del gasto <small>(requerido)</small>
                </span>
              }
              id="value"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "value", "number", 3)
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              labelText={<span>Concepto</span>}
              id="out_concept"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.setState({ concept: event.target.value })
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
