import React from "react";
import {farms} from "actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
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
import moment from "moment";

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

const fruit_types = [
  {value: "M", name: "Mango Tommy"},
  {value: "F", name: "Mango Farchild"},
  {value: "N", name: "Naranja"},
  {value: "D", name: "Mandarina"},
  {value: "L", name: "Limón"},
  {value: "A", name: "Aguacate"},
  {value: "B", name: "Banano"}
];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      id: 0,
      specie: "",
      seed_date: "",
      farm: ""
    };
  }

  sendState() {
    return this.state;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    return value.length >= length;
  }

  handleSimple = event => {
    this.setState({[event.target.name]: event.target.value});
  };
  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  componentDidMount() {
    this.props.fetchFarms();
    if (this.props.update !== {}) {
      const to_update = this.props.update;
      if (to_update.id) {
        this.setState({
          update: true,
          id: this.props.trees[0].id,
          specie: this.props.trees[0].specie,
          seed_date: this.props.trees[0].seed_date
        });
      }
    }
  }

  render() {
    const {classes} = this.props;
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
          <h4 className={classes.infoText}>Información del árbol</h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="specie" className={classes.selectLabel}>
              Seleccione tipo de árbol <small>(requerido)</small>
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
                Finca
              </MenuItem>
              {farms_items}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={8}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}
            disabled={this.state.update}
          >
            <InputLabel htmlFor="seed_date" className={classes.selectLabel}>
              Seleccione fecha de siembra del árbol <small>(requerido)</small>
            </InputLabel>
            <Datetime
              closeOnSelect
              editable={false}
              dateFormat={"YYYY-MM-DD"}
              className={classes.datePicker}
              timeFormat={false}
              value={this.state.seed_date}
              onChange={date =>
                this.setState({seed_date: date.format("YYYY-MM-DD")})
              }
              isValidDate={currentDate => {
                return currentDate.isBefore(moment());
              }}
              inputProps={{
                name: "seed_date",
                id: "seed_date",
                style: style.datePicker
              }}
            />
          </FormControl>
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
    update: state.updates,
    farms: state.farms,
    trees: state.trees
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
