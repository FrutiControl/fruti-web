import React from "react";
import { outcomes } from "actions";
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
  },
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
    fontSize: "20px"
  }
};

const useStyles = makeStyles(styles);

function Budget(props) {
  const [data, setData] = React.useState([]);
  const [outcomes, setOutcomes] = React.useState([]);
  const [total_recommended, setTRecommended] = React.useState(0);
  const [total_outcomes, setTOutcomes] = React.useState(0);
  const mapRecommendedOutcomes = myOutcomes => {
    let recommendedOutcomes = myOutcomes.map(outcome => {
      if (outcome.recommended) {
        return outcome;
      }
    });
    let len = recommendedOutcomes.length;
    for (let i = 0; i < len; i++) {
      if (!recommendedOutcomes[i]) {
        recommendedOutcomes.splice(i, 1);
        len--;
        i--;
      }
    }
    if (recommendedOutcomes.length > 0) {
      return recommendedOutcomes.map((outcome, key) => {
        return {
          pos: key,
          id: outcome.id,
          activity: getActivity(outcome.activity),
          act_type: getActType(outcome.act_type),
          type: getOutType(outcome.type),
          quantity: outcome.quantity,
          date: outcome.date,
          value: outcome.value,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  alert("You've clicked EDIT button on ID:" + outcome.id);
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
                      `¿Está seguro de eliminar el gasto por ${getActivity(
                        outcome.activity
                      )} del ${outcome.date}?`
                    )
                  ) {
                    props.deleteOutcome(outcome.id);
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
    } else {
      return [];
    }
  };
  const getRealOutcomes = allOutcomes => {
    let realOutcomes = [];
    for (let i = 0; i < allOutcomes.length; i++) {
      if (!allOutcomes[i].recommended) {
        realOutcomes.push(allOutcomes[i]);
      }
    }
    return realOutcomes;
  };
  React.useEffect(() => {
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Buscar...";
    }
    props.fetchRecommendedOutcomes();
  }, []);
  React.useEffect(() => {
    setData(mapRecommendedOutcomes(props.outcomes));
    setOutcomes(getRealOutcomes(props.outcomes));
  }, [props.outcomes]);
  React.useEffect(() => {
    let totalOutcome = 0;
    for (let outcome of outcomes) {
      totalOutcome += outcome.value;
    }
    let totalRecommended = 0;
    for (let outcome of data) {
      totalRecommended += outcome.value;
    }
    setTRecommended(totalRecommended);
    setTOutcomes(totalOutcome);
  }, [data, outcomes]);
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={10}>
        <Card>
          <CardHeader color="danger" icon>
            <CardIcon color="danger">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Presupuesto Estimado</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={4}>
                <h5 className={classes.infoText}>
                  Total de Gastos presupuestados:
                  {` ${total_recommended}`}
                </h5>
              </GridItem>
              <GridItem xs={4}>
                <h5 className={classes.infoText}>
                  {total_outcomes > total_recommended
                    ? `Desfase: ${total_recommended - total_outcomes}`
                    : `Ahorro: ${total_recommended - total_outcomes}`}
                </h5>
              </GridItem>
              <GridItem xs={4}>
                <h5 className={classes.infoText}>
                  Total de Gastos reales:
                  {` ${total_outcomes}`}
                </h5>
              </GridItem>
            </GridContainer>
            <ReactTable
              nextText={"Siguiente"}
              previousText={"Anterior"}
              pageJumpText={"filas"}
              pageText={"Páginas"}
              ofText={"de"}
              rowsText={"filas"}
              noDataText={"No hay datos"}
              data={data}
              filterable
              columns={[
                {
                  Header: "Actividad",
                  accessor: "activity"
                },
                {
                  Header: "Tipo de actividad",
                  accessor: "act_type"
                },
                {
                  Header: "Fecha",
                  accessor: "date"
                },
                {
                  Header: "Tipo",
                  accessor: "type"
                },
                {
                  Header: "Monto",
                  accessor: "value"
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
const getActType = act_type => {
  switch (act_type) {
    case "P1":
      return "Sanitaria";
    case "P2":
      return "Formación";
    case "P3":
      return "Mantenimiento";
    case "P4":
      return "Limpieza";
    case "F1":
      return "Crecimiento";
    case "F2":
      return "Producción";
    case "F3":
      return "Mantenimiento";
    case "U1":
      return "Insectos";
    case "U2":
      return "Hongo";
    case "U3":
      return "Hierba";
    case "U4":
      return "Ácaros";
    case "U5":
      return "Pestes";
    case "R1":
      return " ";
    case "R2":
      return "Sistema";
    case "R3":
      return "Manual";
    case "S1":
      return "Mango Tommy";
    case "S2":
      return "Mango Farchild";
    case "S3":
      return "Naranjos";
    case "S4":
      return "Aguacates";
    case "S5":
      return "Mandarinas";
    case "S6":
      return "Limones";
    case "S7":
      return "Bananos";
    default:
      return " ";
  }
};
const getOutType = out_type => {
  switch (out_type) {
    case "M":
      return "Materiales";
    case "O":
      return "Mano de obra";
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
      return " ";
  }
};
const mapStateToProps = state => {
  return {
    outcomes: state.outcomes,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRecommendedOutcomes: () =>
      dispatch(outcomes.fetchRecommendedOutcomes()),
    deleteOutcome: id => dispatch(outcomes.deleteOutcome(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budget);
