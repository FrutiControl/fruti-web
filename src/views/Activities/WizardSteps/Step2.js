import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import Assignment from "@material-ui/icons/Assignment";
import CardBody from "../../../components/Card/CardBody";
import ReactTable from "react-table";
import Card from "../../../components/Card/Card";

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
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false
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

  render() {
    const { classes } = this.props;
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
                  noDataText={"No hay datos"}
                  //data={dataRows}
                  filterable
                  columns={[
                    {
                      Header: "Número",
                      accessor: "name"
                    },
                    {
                      Header: "Tipo de fruto",
                      accessor: "position"
                    },
                    {
                      Header: "Fecha Siembra",
                      accessor: "age"
                    },
                    {
                      Header: "Granja",
                      accessor: "age"
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
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step2);
