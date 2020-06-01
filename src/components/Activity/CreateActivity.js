import React from "react";
import { Redirect } from "react-router-dom";
import {
  fertilizations,
  fumigations,
  outcomes,
  prunings,
  recollections,
  waterings
} from "actions";
import { connect } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.js";

class CreateActivity extends React.Component {
  constructor(props) {
    super(props);
    let width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      }
    }
    this.state = {
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1,
      previousButton: false,
      finishButton: this.props.steps.length === 1,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      allStates: {}
    };
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }
  createActivity = React.createRef();
  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      let validationState = true;
      if (key > this.state.currentStep) {
        for (let i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: {
                ...this.state.allStates,
                [this.props.steps[i].stepId]: this[
                  this.props.steps[i].stepId
                ].sendState()
              }
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1,
          previousButton: key > 0,
          finishButton: this.props.steps.length === key + 1
        });
        this.refreshAnimation(key);
      }
    }
  }
  nextButtonClick() {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
        this.setState({
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        });
      }
      let key = this.state.currentStep + 1;
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1,
        previousButton: key > 0,
        finishButton: this.props.steps.length === key + 1
      });
      this.refreshAnimation(key);
    }
  }
  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: {
          ...this.state.allStates,
          [this.props.steps[this.state.currentStep].stepId]: this[
            this.props.steps[this.state.currentStep].stepId
          ].sendState()
        }
      });
    }
    let key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1,
        previousButton: key > 0,
        finishButton: this.props.steps.length === key + 1
      });
      this.refreshAnimation(key);
    }
  }
  finishButtonClick() {
    if (
      (this.props.validate === false &&
        this.props.finishButtonClick !== undefined) ||
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined) &&
        this.props.finishButtonClick !== undefined)
    ) {
      this.setState(
        {
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        },
        () => {
          let new_activity = this.state.allStates.act_chars;
          let activity_trees = this.state.allStates.act_trees.trees;
          switch (new_activity.activity) {
            case "R":
              this.props.addWatering(
                new_activity.start_date,
                new_activity.end_date,
                Number(new_activity.farm),
                new_activity.act_type,
                activity_trees
              );
              break;
            case "P":
              this.props.addPruning(
                new_activity.start_date,
                new_activity.end_date,
                Number(new_activity.farm),
                new_activity.act_type,
                activity_trees
              );
              break;
            case "F":
              this.props.addFertilization(
                new_activity.start_date,
                new_activity.end_date,
                Number(new_activity.farm),
                new_activity.act_type,
                activity_trees
              );
              break;
            case "U":
              this.props.addFumigation(
                new_activity.start_date,
                new_activity.end_date,
                Number(new_activity.farm),
                new_activity.act_type,
                activity_trees
              );
              break;
            case "H":
              this.props.addRecollection(
                new_activity.start_date,
                new_activity.end_date,
                Number(new_activity.farm),
                new_activity.act_type,
                activity_trees
              );
              break;
          }
          this.props.addOutcome(
            new_activity.start_date,
            Number(new_activity.tools_cost),
            "M",
            new_activity.activity,
            mapOutActType(new_activity.activity, new_activity.act_type),
            `${getActivity(new_activity.activity)}:${mapActType(
              new_activity.activity,
              new_activity.act_type
            ) +
              " " +
              new_activity.start_date}`,
            true
          );
          this.props.addOutcome(
            new_activity.start_date,
            Number(new_activity.work_cost),
            "O",
            new_activity.activity,
            mapOutActType(new_activity.activity, new_activity.act_type),
            `${getActivity(new_activity.activity)}:${mapActType(
              new_activity.activity,
              new_activity.act_type
            ) +
              " " +
              new_activity.start_date}`,
            true
          );
          this.setState({ done: true });
          alert(`¡La actividad fue creada correctamente!`);
        }
      );
    }
  }
  refreshAnimation(index) {
    let total = this.props.steps.length;
    let li_width = 100 / total;
    let total_steps = this.props.steps.length;
    let move_distance =
      this.createActivity.current.children[0].offsetWidth / total_steps;
    let index_temp = index;
    let vertical_level = 0;

    let mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.createActivity.current.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    let step_width = move_distance;
    move_distance = move_distance * index_temp;

    let current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    let movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };
    this.setState({ movingTabStyle: movingTabStyle });
  }
  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    if (this.state.done) return <Redirect to={`/admin/activities`} />;
    return (
      <div className={classes.wizardContainer} ref={this.createActivity}>
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: this.state.width }}
                  >
                    <a
                      href="#pablo"
                      className={classes.stepsAnchor}
                      onClick={e => {
                        e.preventDefault();
                        this.navigationStepChange(key);
                      }}
                    >
                      {prop.stepName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + " " + classes[color]}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={node => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="rose"
                  className={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color="rose"
                  className={this.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

CreateActivity.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  subtitle: "And this would be your subtitle",
  previousButtonText: "Volver",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Siguiente",
  finishButtonClasses: "",
  finishButtonText: "Crear Actividad"
};
CreateActivity.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.object.isRequired,
      stepId: PropTypes.string.isRequired
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool
};
const mapActType = (act, type) => {
  switch (act) {
    case "P":
      switch (type) {
        case "S":
          return " Sanitaria";
        case "F":
          return " Formación";
        case "M":
          return " Mantenimiento";
        case "L":
          return " Limpieza";
        default:
          return " ";
      }
    case "F":
      switch (type) {
        case "C":
          return " Crecimiento";
        case "P":
          return " Producción";
        case "M":
          return " Mantenimiento";
        default:
          return " ";
      }
    case "U":
      switch (type) {
        case "I":
          return " Insectos";
        case "F":
          return " Hongo";
        case "H":
          return " Hierba";
        case "A":
          return " Ácaros";
        case "P":
          return " Peste";
        default:
          return " ";
      }
    case "R":
      switch (type) {
        case "N":
          return "  ";
        case "S":
          return " Sistema";
        case "M":
          return " Manual";
        default:
          return " ";
      }
    default:
      break;
  }
};
const mapOutActType = (act, type) => {
  switch (act) {
    case "P":
      switch (type) {
        case "S":
          return "P1";
        case "F":
          return "P2";
        case "M":
          return "P3";
        case "L":
          return "P4";
        default:
          return;
      }
    case "F":
      switch (type) {
        case "C":
          return "F1";
        case "P":
          return "F2";
        case "M":
          return "F3";
        default:
          return;
      }
    case "U":
      switch (type) {
        case "I":
          return "U1";
        case "F":
          return "U2";
        case "H":
          return "U3";
        case "A":
          return "U4";
        case "P":
          return "U5";
        default:
          return;
      }
    case "R":
      switch (type) {
        case "N":
          return "R1";
        case "M":
          return "R2";
        case "S":
          return "R3";
        default:
          return;
      }
    case "H":
      switch (type) {
        case "M":
          return "S1";
        case "F":
          return "S2";
        case "N":
          return "S3";
        case "D":
          return "S4";
        case "L":
          return "S5";
        case "A":
          return "S6";
        case "B":
          return "S7";
        default:
          return;
      }
    default:
      break;
  }
};
const getActivity = activity => {
  switch (activity) {
    case "P":
      return "Poda";
    case "F":
      return "Fertilización";
    case "U":
      return "Fumigación";
    case "R":
      return "Riego";
    case "S":
      return "Siembra";
    case "H":
      return "Recolección";
    default:
      return;
  }
};
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addFertilization: (start_date, end_date, farm, type, trees) =>
      dispatch(
        fertilizations.addFertilization(start_date, end_date, farm, type, trees)
      ),
    addPruning: (start_date, end_date, farm, type, trees) =>
      dispatch(prunings.addPruning(start_date, end_date, farm, type, trees)),
    addFumigation: (start_date, end_date, farm, type, trees) =>
      dispatch(
        fumigations.addFumigation(start_date, end_date, farm, type, trees)
      ),
    addWatering: (start_date, end_date, farm, type, trees) =>
      dispatch(waterings.addWatering(start_date, end_date, farm, type, trees)),
    addRecollection: (start_date, end_date, farm, type, trees) =>
      dispatch(
        recollections.addRecollection(start_date, end_date, farm, type, trees)
      ),
    addOutcome: (date, value, out_type, act, act_type, concept, recommended) =>
      dispatch(
        outcomes.addOutcome(
          date,
          value,
          out_type,
          act,
          act_type,
          concept,
          recommended
        )
      )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(wizardStyle)(CreateActivity));
