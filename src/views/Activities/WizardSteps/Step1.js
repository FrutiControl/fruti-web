import React from "react";
import { farms } from "actions";
import { connect } from "react-redux";
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
const activities = [
  { value: "P", name: "Poda" },
  { value: "F", name: "Fertilización" },
  { value: "U", name: "Fumigación" },
  { value: "R", name: "Riego" }
];
const prunes = [
  { value: "S", name: "Sanitaria" },
  { value: "F", name: "Formación" },
  { value: "M", name: "Mantenimineto" },
  { value: "L", name: "Limpieza" }
];
const fertilizations = [
  { value: "C", name: "Crecimineto" },
  { value: "P", name: "Producción" },
  { value: "M", name: "Mantenimiento" }
];
const fumigations = [
  { value: "I", name: "Insectos" },
  { value: "F", name: "Hongos" },
  { value: "H", name: "Hierba" },
  { value: "A", name: "Ácaros" },
  { value: "p", name: "Peste" }
];
const waterings = [
  { value: "M", name: "Manual" },
  { value: "S", name: "Sistema" }
];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      activity: "",
      act_type: "",
      act_typesItems: [],
      farm: ""
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
      }
    });
  };
  change(event, stateName) {
    this.setState({ [stateName]: event.target.value });
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.props.fetchFarms();
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
          <h4 className={classes.infoText}>
            A continuación se solicitan datos sobre la actividad
            correspondiente.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="activity" className={classes.selectLabel}>
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
            <InputLabel htmlFor="act_type" className={classes.selectLabel}>
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
        <GridItem xs={12} sm={8}>
          <Datetime
            closeOnSelect
            editable={false}
            dateFormat={"YYYY-MM-DD"}
            className={classes.datePicker}
            timeFormat={false}
            onChange={date =>
              this.setState({ start_date: date.format("YYYY-MM-DD") })
            }
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
            onChange={date =>
              this.setState({ end_date: date.format("YYYY-MM-DD") })
            }
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
    fetchFarms: () => dispatch(farms.fetchFarms())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step1));
