import React from "react";
import { incomes, outcomes } from "actions";
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

function SeeIncome(props) {
  const [data, setData] = React.useState([]);
  const [outcomes, setOutcomes] = React.useState([]);
  const [total_incomes, setTIncomes] = React.useState(0);
  const [total_outcomes, setTOutcomes] = React.useState(0);
  const mapIncomes = myIncomes => {
    return myIncomes.map((income, key) => {
      return {
        pos: key,
        id: income.id,
        type: getSpecie(income.fruit_type),
        quantity: income.quantity,
        date: income.date,
        value: income.value * income.quantity,
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                alert("You've clicked EDIT button on ID:" + income.id);
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
                    `¿Está seguro de eliminar el ingreso por ${getSpecie(
                      income.fruit_type
                    )}s del ${income.date}?`
                  )
                ) {
                  props.deleteIncome(income.id);
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
    props.fetchIncomes();
    props.fetchOutcomes();
  }, []);
  React.useEffect(() => {
    setData(mapIncomes(props.incomes));
    setOutcomes(props.outcomes);
  }, [props.outcomes, props.incomes]);
  React.useEffect(() => {
    let totalOutcome = 0;
    for (let outcome of outcomes) {
      totalOutcome += outcome.value;
    }
    let totalIncome = 0;
    for (let income of data) {
      totalIncome += income.value;
    }
    setTIncomes(totalIncome);
    setTOutcomes(totalOutcome);
  }, [data, outcomes]);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Lista de Ingresos</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={4}>
                <h4 className={classes.infoText}>
                  Total de Ingresos:
                  {` ${total_incomes}`}
                </h4>
              </GridItem>
              <GridItem xs={4}>
                <h4 className={classes.infoText}>
                  {total_outcomes > total_incomes
                    ? `Pérdidas: ${total_incomes - total_outcomes}`
                    : `Ganancias: ${total_incomes - total_outcomes}`}
                </h4>
              </GridItem>
              <GridItem xs={4}>
                <h4 className={classes.infoText}>
                  Total de Gastos:
                  {` ${total_outcomes}`}
                </h4>
              </GridItem>
            </GridContainer>
            <ReactTable
              nextText={"Siguiente"}
              previousText={"Anterior"}
              pageJumpText={"filas"}
              pageText={"Páginas"}
              ofText={"de"}
              rowsText={"filas"}
              noDataText={"No hay ingresos"}
              data={data}
              filterable
              columns={[
                {
                  Header: "Tipo de fruto vendido",
                  accessor: "type"
                },
                {
                  Header: "Cantidad Vendida",
                  accessor: "quantity"
                },
                {
                  Header: "Fecha",
                  accessor: "date"
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
    outcomes: state.outcomes,
    incomes: state.incomes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOutcomes: () => dispatch(outcomes.fetchOutcomes()),
    fetchIncomes: () => dispatch(incomes.fetchIncomes()),
    deleteIncome: id => dispatch(incomes.deleteIncome(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeIncome);
