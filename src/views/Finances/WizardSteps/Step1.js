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
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle";

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
const fruit_types = [
  { value: "M", name: "Mango Tommy" },
  { value: "F", name: "Mango Farchild" },
  { value: "N", name: "Naranja" },
  { value: "D", name: "Mandarina" },
  { value: "L", name: "Limón" },
  { value: "A", name: "Aguacate" },
  { value: "B", name: "Banano" }
];
const units = [
  { value: "C", name: "Canastillas" },
  { value: "K", name: "Kilos" },
  { value: "U", name: "Unidades" }
];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruit_type: "",
      income_date: "",
      quantity: 0,
      units: "",
      unit_value: 0,
      total_value: 0,
      concept: "",
      quantityState: "",
      unit_valueState: ""
    };
  }

  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
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
    if (
      this.state.quantityState === "success" &&
      this.state.unit_valueState === "success"
    ) {
      return true;
    } else {
      if (this.state.quantityState !== "success") {
        this.setState({ quantityState: "error" });
      }
      if (this.state.unit_valueState !== "success") {
        this.setState({ unit_valueState: "error" });
      }
    }
    return false;
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
    const units_items = units.map((units, key) => {
      return (
        <MenuItem
          key={key}
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
          value={units.value}
        >
          {units.name}
        </MenuItem>
      );
    });
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
              Seleccione tipo de fruto vendido <small>(requerido)</small>
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.fruit_type}
              onChange={this.handleSimple}
              inputProps={{
                name: "fruit_type",
                id: "fruit_type"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Tipo de fruto vendido
              </MenuItem>
              {fruit_items}
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
              this.setState({ income_date: date.format("YYYY-MM-DD") })
            }
            inputProps={{
              placeholder: "Seleccione fecha de ingreso (requerido)",
              style: style.datePicker
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            success={this.state.quantityState === "success"}
            error={this.state.quantityState === "error"}
            labelText={
              <span>
                Cantidad de fruto vendida <small>(requerido)</small>
              </span>
            }
            id="quantity"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => {
                this.change(event, "quantity", "number", 3);
                this.setState({
                  total_value:
                    this.state.unit_value *
                    (Number(event.target.value) > 0
                      ? Number(event.target.value)
                      : 0)
                });
              }
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Seleccione unidades de venta <small>(requerido)</small>
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.units}
              onChange={this.handleSimple}
              inputProps={{
                name: "units",
                id: "units"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Unidades de venta
              </MenuItem>
              {units_items}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            success={this.state.unit_valueState === "success"}
            error={this.state.unit_valueState === "error"}
            labelText={
              <span>
                Precio por Unidad <small>(requerido)</small>
              </span>
            }
            id="unit_value"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => {
                this.change(event, "unit_value", "number", 3);
                this.setState({
                  total_value:
                    this.state.quantity *
                    (Number(event.target.value) > 0
                      ? Number(event.target.value)
                      : 0)
                });
              }
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <h4> Total: {this.state.total_value} </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            labelText={<span>Concepto</span>}
            id="concept"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.setState({ concept: event.target.value })
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

export default withStyles(style)(Step1);
