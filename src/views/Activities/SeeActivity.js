import React from "react";
import { Link } from "react-router-dom";
import {
  seedings,
  fumigations,
  fertilizations,
  prunings,
  waterings,
  recollections,
  farms
} from "actions";
import { connect } from "react-redux";
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

function SeeActivity(props) {
  const [data, setData] = React.useState([]);
  const deleteActivity = (act, id) => {
    switch (act) {
      case "Poda":
        props.deletePruning(id);
        break;
      case "Fertilización":
        props.deleteFertilization(id);
        break;
      case "Fumigación":
        props.deleteFumigation(id);
        break;
      case "Riego":
        props.deleteWatering(id);
        break;
      case "Siembra":
        props.deleteSeeding(id);
        break;
      case "Recolección":
        props.deleteRecollection(id);
        break;
      default:
        return;
    }
  };
  const mapActivities = myActivities => {
    return myActivities.map(activity => {
      return {
        name: activity.recommended
          ? `${activity.name} (recomendada)`
          : activity.name,
        type: mapActType(activity.name, activity.type),
        start: activity.start_date,
        end: activity.end_date,
        id: activity.id,
        progress: `${Number(activity.progress * 100).toFixed(0)}%`,
        farm: getFarm(activity.farm, props.farms),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                alert(
                  `You've clicked EDIT button on: ${activity.name} ${mapActType(
                    activity.name,
                    activity.type
                  )}`
                );
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
                    `¿Está seguro de eliminar la actividad ${activity.name +
                      mapActType(activity.name, activity.type)}?`
                  )
                ) {
                  deleteActivity(activity.name, activity.id);
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
    props.fetchFarms();
    props.fetchSeedings();
    props.fetchWaterings();
    props.fetchPrunings();
    props.fetchFumigations();
    props.fetchFertilizations();
    props.fetchRecollections();
  }, []);
  React.useEffect(() => {
    setData(
      mapActivities([
        ...props.waterings,
        ...props.prunings,
        ...props.fertilizations,
        ...props.fumigations,
        ...props.seedings,
        ...props.recollections
      ])
    );
  }, [
    props.farms,
    props.waterings,
    props.prunings,
    props.fertilizations,
    props.fumigations,
    props.seedings,
    props.recollections
  ]);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Lista de Actividades</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              nextText={"Siguiente"}
              previousText={"Anterior"}
              pageJumpText={"filas"}
              pageText={"Páginas"}
              ofText={"de"}
              rowsText={"filas"}
              data={data}
              filterable
              columns={[
                {
                  Header: "Actividad",
                  accessor: "name"
                },
                {
                  Header: "Tipo",
                  accessor: "type"
                },
                {
                  Header: "Fecha inicial",
                  accessor: "start"
                },
                {
                  Header: "Fecha fin",
                  accessor: "end"
                },
                {
                  Header: "Progreso",
                  accessor: "progress"
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

const mapActType = (act, type) => {
  switch (act) {
    case "Poda":
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
          return;
      }
    case "Fertilización":
      switch (type) {
        case "C":
          return " Crecimiento";
        case "P":
          return " Producción";
        case "M":
          return " Mantenimiento";
        default:
          return;
      }
    case "Fumigación":
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
          return;
      }
    case "Riego":
      switch (type) {
        case "N":
          return "  ";
        case "S":
          return " Sistema";
        case "M":
          return " Manual";
        default:
          return;
      }
    case "Siembra":
      switch (type) {
        case "M":
          return " Mango Tommy";
        case "F":
          return " Mango Farchild";
        case "N":
          return " Naranjos";
        case "A":
          return " Aguacates";
        case "D":
          return " Mandarinas";
        case "L":
          return " Limones";
        case "B":
          return " Bananos";
        default:
          return;
      }
    case "Recolección":
      switch (type) {
        case "M":
          return " Mango Tommy";
        case "F":
          return " Mango Farchild";
        case "N":
          return " Naranjos";
        case "A":
          return " Aguacates";
        case "D":
          return " Mandarinas";
        case "L":
          return " Limones";
        case "B":
          return " Bananos";
        default:
          return;
      }
    default:
      return;
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
    farms: state.farms,
    waterings: state.waterings,
    seedings: state.seedings,
    prunings: state.prunings,
    fertilizations: state.fertilizations,
    fumigations: state.fumigations,
    recollections: state.recollections,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchFarms: () => dispatch(farms.fetchFarms()),
    fetchSeedings: () => dispatch(seedings.fetchSeedings()),
    deleteSeeding: id => dispatch(seedings.deleteSeeding(id)),
    fetchWaterings: () => dispatch(waterings.fetchWaterings()),
    deleteWatering: id => dispatch(waterings.deleteWatering(id)),
    fetchPrunings: () => dispatch(prunings.fetchPrunings()),
    deletePruning: id => dispatch(prunings.deletePruning(id)),
    fetchFumigations: () => dispatch(fumigations.fetchFumigations()),
    deleteFumigation: id => dispatch(fumigations.deleteFumigation(id)),
    fetchFertilizations: () => dispatch(fertilizations.fetchFertilizations()),
    deleteFertilization: id => dispatch(fertilizations.deleteFertilization(id)),
    fetchRecollections: () => dispatch(recollections.fetchRecollections()),
    deleteRecollection: id => dispatch(recollections.deleteRecollection(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeActivity);
