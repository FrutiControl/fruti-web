import React from "react";
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

import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

const useStyles = makeStyles(styles);


export default function Budget() {
    const [data, setData] = React.useState(
        dataTable.dataRows.map((prop, key) => {
            return {
                id: key,
                name: prop[0],
                position: prop[1],
                office: prop[2],
                age: prop[3],
                amount: prop[4],
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a edit kind of action */}
                        <Button
                            justIcon
                            round
                            simple
                            onClick={() => {
                                let obj = data.find(o => o.id === key);
                                alert(
                                    "You've clicked EDIT button on \n{ \nName: " +
                                    obj.name +
                                    ", \nposition: " +
                                    obj.position +
                                    ", \noffice: " +
                                    obj.office +
                                    ", \nage: " +
                                    obj.age +
                                    "\n}."
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
                                var newData = data;
                                newData.find((o, i) => {
                                    if (o.id === key) {
                                        // here you should add some custom code so you can delete the data
                                        // from this component and from your server as well
                                        newData.splice(i, 1);
                                        return true;
                                    }
                                    return false;
                                });
                                setData([...newData]);
                            }}
                            color="danger"
                            className="remove"
                        >
                            <Close />
                        </Button>{" "}
                    </div>
                )
            };
        })
    );
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
                                    accessor: "name"
                                },
                                {
                                    Header: "Subtipo de actividad",
                                    accessor: "position"
                                },
                                {
                                    Header: "Fecha",
                                    accessor: "office"
                                },
                                {
                                    Header: "Monto",
                                    accessor: "age",
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
