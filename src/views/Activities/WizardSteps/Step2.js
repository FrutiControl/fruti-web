import React from "react";
import { trees } from "actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: []
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
  componentDidMount() {
    this.props.fetchTrees();
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Buscar...";
    }
  }

  render() {
    const { classes } = this.props;
    console.log(`Árboles: ${this.state.trees}`);
    const mapTrees = this.props.trees.map((tree, key) => {
      return {
        pos: key,
        id: tree.id,
        specie: getSpecie(tree.specie),
        seed_date: tree.seed_date,
        farm: tree.farm,
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Checkbox
              tabIndex={-1}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              onClick={() => {
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
    trees: state.trees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrees: () => dispatch(trees.fetchTrees())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step2));
