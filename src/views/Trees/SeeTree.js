import React from "react";
import { connect } from "react-redux";
import { trees, farms } from "actions";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

function SeeTree(props) {
  const [data, setData] = React.useState([]);
  const mapTrees = myTrees => {
    return myTrees.map((tree, key) => {
      return {
        pos: key,
        id: tree.id,
        specie: getSpecie(tree.specie),
        seed_date: tree.seed_date,
        farm: getFarm(tree.farm, props.farms),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                alert("You've clicked EDIT button on ID:" + tree.id);
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                if (
                  window.confirm(
                    `¿Está seguro de eliminar el árbol ${tree.id}?`
                  )
                ) {
                  props.deleteTree(tree.id);
                }
              }}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        )
      };
    });
  };
  React.useEffect(() => {
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Buscar...";
    }
    props.fetchTrees();
    props.fetchFarms();
  }, []);
  React.useEffect(() => {
    setData(mapTrees(props.trees));
  }, [props.trees, props.farms]);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
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
              noDataText={"No hay árboles"}
              data={data}
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
                  Header: "Fecha de Siembra",
                  accessor: "seed_date"
                },
                {
                  Header: "Granja",
                  accessor: "farm"
                },
                {
                  Header: "Editar - Eliminar",
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
  );
}

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
const getFarm = (id, farms) => {
  for (let i = 0; i < farms.length; i++) {
    if (farms[i].id === id) {
      return farms[i].name;
    }
  }
};
const mapStateToProps = state => {
  return {
    trees: state.trees,
    farms: state.farms,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrees: () => dispatch(trees.fetchTrees()),
    fetchFarms: () => dispatch(farms.fetchFarms()),
    deleteTree: id => dispatch(trees.deleteTree(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeTree);
