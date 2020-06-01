import React from "react";
import { farms } from "actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

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
import CustomInput from "components/CustomInput/CustomInput";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 100px",
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
const update_types = ["watering", "pruning", "fertilization", "fumigation"];
const activities = [
  { value: "P", name: "Poda" },
  { value: "F", name: "Fertilización" },
  { value: "U", name: "Fumigación" },
  { value: "R", name: "Riego" },
  { value: "H", name: "Recolección" }
];
const prunes_objs = [
  { value: "S", name: "Sanitaria" },
  { value: "F", name: "Formación" },
  { value: "M", name: "Mantenimiento" },
  { value: "L", name: "Limpieza" }
];
const fertilizations_objs = [
  { value: "C", name: "Crecimiento" },
  { value: "P", name: "Producción" },
  { value: "M", name: "Mantenimiento" }
];
const fumigations_objs = [
  { value: "I", name: "Insectos" },
  { value: "F", name: "Hongos" },
  { value: "H", name: "Hierba" },
  { value: "A", name: "Ácaros" },
  { value: "p", name: "Peste" }
];
const waterings_objs = [
  { value: "M", name: "Manual" },
  { value: "S", name: "Sistema" }
];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      act_id: 0,
      update: false,
      tools_cost: 0,
      work_cost: 0,
      start_date: "",
      end_date: "",
      activity: "",
      act_type: "",
      act_typesItems: [],
      farm: "",
      act_trees: []
    };
  }
  sendState() {
    return this.state;
  }
  handleActivity = event => {
    this.setState({ activity: event.target.value }, () => {
      switch (event.target.value) {
        case "F":
          this.setState({ act_typesItems: fertilizations_objs });
          break;
        case "U":
          this.setState({ act_typesItems: fumigations_objs });
          break;
        case "P":
          this.setState({ act_typesItems: prunes_objs });
          break;
        case "R":
          this.setState({ act_typesItems: waterings_objs });
          break;
        default:
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
    if (this.props.update !== {}) {
      const to_update = this.props.update;
      const update_type = update_types.find(up_type => {
        return up_type === to_update.type;
      });
      if (update_type) {
        this.setState({ update: true });
        switch (to_update.type) {
          case "watering":
            this.setState({
              act_id: this.props.waterings[0].id,
              start_date: this.props.waterings[0].start_date,
              end_date: this.props.waterings[0].end_date,
              activity: "R",
              act_type: this.props.waterings[0].type,
              act_typesItems: waterings_objs,
              farm: this.props.waterings[0].farm,
              act_trees: this.props.waterings[0].trees
            });
            break;
          case "fumigation":
            this.setState({
              act_id: this.props.fumigations[0].id,
              start_date: this.props.fumigations[0].start_date,
              end_date: this.props.fumigations[0].end_date,
              activity: "U",
              act_type: this.props.fumigations[0].type,
              act_typesItems: fumigations_objs,
              farm: this.props.fumigations[0].farm,
              act_trees: this.props.fumigations[0].trees
            });
            break;
          case "fertilization":
            this.setState({
              act_id: this.props.fertilizations[0].id,
              start_date: this.props.fertilizations[0].start_date,
              end_date: this.props.fertilizations[0].end_date,
              activity: "F",
              act_type: this.props.fertilizations[0].type,
              act_typesItems: fertilizations_objs,
              farm: this.props.fertilizations[0].farm,
              act_trees: this.props.fertilizations[0].trees
            });
            break;
          case "pruning":
            this.setState({
              act_id: this.props.prunings[0].id,
              start_date: this.props.prunings[0].start_date,
              end_date: this.props.prunings[0].end_date,
              activity: "P",
              act_type: this.props.prunings[0].type,
              act_typesItems: prunes_objs,
              farm: this.props.prunings[0].farm,
              act_trees: this.props.prunings[0].trees
            });
            break;
          default:
            break;
        }
      }
    }
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
          <h4 style={{ margin: "10px 0 40px", textAlign: "center" }}>
            A continuación se solicitan datos sobre la actividad
            correspondiente.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}
            disabled={this.state.update}
          >
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
          <FormControl
            fullWidth
            className={classes.selectFormControl}
            disabled={this.state.update}
          >
            <InputLabel htmlFor="farm" className={classes.selectLabel}>
              Seleccione granja a la que pertenece <small>(requerido)</small>
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
          <FormControl
            fullWidth
            className={classes.selectFormControl}
            disabled={this.state.update}
          >
            <InputLabel htmlFor="start_date" className={classes.selectLabel}>
              Seleccione la fecha de inicio de la actividad{" "}
              <small>(requerido)</small>
            </InputLabel>
            <Datetime
              closeOnSelect
              editable={false}
              dateFormat={"YYYY-MM-DD"}
              className={classes.datePicker}
              timeFormat={false}
              value={this.state.start_date}
              onChange={date =>
                this.setState({ start_date: date.format("YYYY-MM-DD") })
              }
              isValidDate={currentDate => {
                return currentDate.isAfter(moment().subtract(1, "day"));
              }}
              inputProps={{
                name: "start_date",
                id: "start_date",
                style: style.datePicker,
                disabled: this.state.update
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}
            disabled={this.state.update}
          >
            <InputLabel htmlFor="start_date" className={classes.selectLabel}>
              Seleccione la fecha de fin de la actividad{" "}
              <small>(requerido)</small>
            </InputLabel>
            <Datetime
              closeOnSelect
              editable={false}
              dateFormat={"YYYY-MM-DD"}
              className={classes.datePicker}
              timeFormat={false}
              value={this.state.end_date}
              onChange={date =>
                this.setState({ end_date: date.format("YYYY-MM-DD") })
              }
              isValidDate={currentDate => {
                return currentDate.isAfter(this.state.start_date);
              }}
              inputProps={{
                style: style.datePicker
              }}
            />
          </FormControl>
        </GridItem>
        {!this.state.update && (
          <GridItem xs={12} sm={8}>
            <CustomInput
              className={classes.datePicker}
              labelText="Costos estimados de materiales (editable)"
              id="distance"
              formControlProps={{
                fullWidth: true,
                style: {
                  ...style.datePicker,
                  margin: "0",
                  paddingTop: "10px"
                }
              }}
              inputProps={{
                onChange: event => {
                  this.setState({
                    tools_cost: Number(event.target.value)
                  });
                },
                style: {
                  ...style.datePicker,
                  margin: "0",
                  paddingTop: "10px"
                }
              }}
            />
          </GridItem>
        )}
        {!this.state.update && (
          <GridItem xs={12} sm={8}>
            <CustomInput
              className={classes.datePicker}
              labelText="Costos estimados de mano de obra (editable)"
              id="distance"
              formControlProps={{
                fullWidth: true,
                style: {
                  ...style.datePicker,
                  margin: "0",
                  paddingTop: "10px"
                }
              }}
              inputProps={{
                onChange: event => {
                  this.setState({
                    work_cost: Number(event.target.value)
                  });
                },
                style: {
                  ...style.datePicker,
                  margin: "0",
                  paddingTop: "10px"
                }
              }}
            />
          </GridItem>
        )}
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    update: state.updates,
    farms: state.farms,
    waterings: state.waterings,
    fertilizations: state.fertilizations,
    fumigations: state.fumigations,
    prunings: state.prunings
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
