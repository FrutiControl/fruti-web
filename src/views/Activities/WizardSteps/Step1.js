import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

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
  }
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelectTipoActividad: "",
      simpleSelectSubTipo: "",
      subtype:[{value:"S",name:"sanitaria"},{value:"F",name:"formacion"},{value:"M",name:"mantenimiento"}]
    };
  }
  sendState() {
    return this.state;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "activity":
        break;
      case "subActivity":
        break;
      case "farm":
        break;
      case "startDate":
        break;
      case "endDate":
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            A continuación se solicitan datos sobre la actividad
            correspondiente.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
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
              { this.state.subtype.map((item)=>(
                  <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={item.value}
                  >
                    {item.name}
                  </MenuItem>

              ))}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Seleccione granja a la que pertenece
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelectGranja}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelectGranja",
                id: "simple-select2"
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
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                Mi Tierra
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                El Otro Lado
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={8}>
          <Datetime
            timeFormat={false}
            inputProps={{
              placeholder: "Seleccione fecha de inicio de actividad",
              style: style.datePicker
            }}
          />
        </GridItem>
        <GridItem xs={8}>
          <Datetime
            timeFormat={false}
            inputProps={{
              placeholder: "Seleccione fecha de fin de actividad",
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

export default withStyles(style)(Step1);
