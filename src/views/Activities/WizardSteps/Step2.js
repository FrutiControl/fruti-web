import React from "react";
import {
  waterings,
  prunings,
  fumigations,
  fertilizations,
  trees
} from "actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import Assignment from "@material-ui/icons/Assignment";
import CardBody from "components/Card/CardBody";
import ReactTable from "react-table";
import Card from "components/Card/Card";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choice: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

const update_types = ["watering", "pruning", "fertilization", "fumigation"];
class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      update_type: "",
      update_id: 0,
      table_trees: [],
      trees: []
    };
  }
  sendState() {
    return this.state;
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  isValidated() {
    return true;
  }
  mapId(array) {
    return array.map(id => {
      for (let tree of this.props.trees) {
        if (tree.id === id) {
          return tree;
        }
      }
      return -1;
    });
  }
  componentDidMount() {
    this.props.fetchTrees();
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Buscar...";
    }
    if (this.props.update !== {}) {
      const to_update = this.props.update;
      const update_type = update_types.find(up_type => {
        return up_type === to_update.type;
      });
      if (update_type) {
        this.setState({ update: true, update_type: to_update.type });
        switch (to_update.type) {
          case "watering":
            this.setState({
              table_trees: this.mapId(this.props.waterings[0].trees),
              update_id: this.props.waterings[0].id
            });
            break;
          case "fumigation":
            this.setState({
              table_trees: this.mapId(this.props.fumigations[0].trees),
              update_id: this.props.fumigations[0].id
            });
            break;
          case "fertilization":
            this.setState({
              table_trees: this.mapId(this.props.fertilizations[0].trees),
              update_id: this.props.fertilizations[0].id
            });
            break;
          case "pruning":
            this.setState({
              table_trees: this.mapId(this.props.prunings[0].trees),
              update_id: this.props.prunings[0].id
            });
            break;
          default:
            break;
        }
      }
    }
  }
  componentWillMount() {
    this.props.resetUpdate();
  }
  render() {
    const { classes } = this.props;
    const treesToMap = this.state.update
      ? this.state.table_trees
      : this.props.trees;
    const mapTrees = treesToMap.map((tree, key) => {
      return {
        pos: key,
        id: tree.id,
        specie: getSpecie(tree.specie),
        seed_date: tree.seed_date,
        farm: getFarm(tree.farm, this.props.farms),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Checkbox
              tabIndex={-1}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              onClick={() => {
                if (this.state.update) {
                  switch (this.state.update_type) {
                    case "watering":
                      this.props.wateringProgress(
                        tree.id,
                        this.state.update_id
                      );
                      break;
                    case "fumigation":
                      this.props.fumigationProgress(
                        tree.id,
                        this.state.update_id
                      );
                      break;
                    case "fertilization":
                      this.props.fertilizationProgress(
                        tree.id,
                        this.state.update_id
                      );
                      break;
                    case "pruning":
                      this.props.pruningProgress(tree.id, this.state.update_id);
                      break;
                    default:
                      break;
                  }
                } else {
                  let found = false;
                  let my_trees = this.state.trees;
                  for (let i = 0; i < my_trees.length; i++) {
                    if (my_trees[i] === tree.id) {
                      found = true;
                      my_trees.splice(i, 1);
                      this.setState({ trees: my_trees });
                    }
                  }
                  if (!found)
                    this.setState({ trees: [...this.state.trees, tree.id] });
                }
              }}
              classes={{
                checked: classes.checked,
                root: classes.checkRoot
              }}
            />
          </div>
        )
      };
    });
    return (
      <div>
        <h4 className={classes.infoText}>
          {" "}
          Seleccione los árboles a los que les va a aplicar la actividad
        </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lista de Árboles</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  nextText={"Siguiente"}
                  previousText={"Anterior"}
                  pageJumpText={"filas"}
                  pageText={"Páginas"}
                  ofText={"de"}
                  rowsText={"filas"}
                  noDataText={"Registra tus árboles pare crear acitividades"}
                  data={mapTrees}
                  filterable
                  columns={[
                    {
                      Header: "Número",
                      accessor: "id"
                    },
                    {
                      Header: "Tipo de fruto",
                      accessor: "specie"
                    },
                    {
                      Header: "Fecha Siembra",
                      accessor: "seed_date"
                    },
                    {
                      Header: "Granja",
                      accessor: "farm"
                    },
                    {
                      Header: "Seleccionar",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object
};
const getFarm = (id, farms) => {
  for (let i = 0; i < farms.length; i++) {
    if (farms[i].id === id) {
      return farms[i].name;
    }
  }
};
const getSpecie = specie => {
  switch (specie) {
    case "M":
      return "Mango Tommy";
    case "F":
      return "Mango Farchild";
    case "N":
      return "Naranja";
    case "A":
      return "Aguacate";
    case "D":
      return "Mandarina";
    case "L":
      return "Limón";
    case "B":
      return "Banano";
    default:
      return "Frutal";
  }
};
const mapStateToProps = state => {
  return {
    update: state.updates,
    trees: state.trees,
    farms: state.farms,
    waterings: state.waterings,
    fertilizations: state.fertilizations,
    fumigations: state.fumigations,
    prunings: state.prunings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrees: () => dispatch(trees.fetchTrees()),
    resetUpdate: () => dispatch({ type: "RESET_UPDATE", id: 0 }),
    wateringProgress: (tree_id, watering_id) =>
      dispatch(waterings.wateringProgress(tree_id, watering_id)),
    fumigationProgress: (tree_id, fumigation_id) =>
      dispatch(fumigations.fumigationProgress(tree_id, fumigation_id)),
    fertilizationProgress: (tree_id, fertilization_id) =>
      dispatch(fertilizations.fertilizationProgress(tree_id, fertilization_id)),
    pruningProgress: (tree_id, pruning_id) =>
      dispatch(prunings.pruningProgress(tree_id, pruning_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step2));
