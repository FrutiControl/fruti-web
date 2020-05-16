import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import BugReport from "@material-ui/icons/BugReport";
import HealingIcon from "@material-ui/icons/Healing";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Timeline from "components/Timeline/Timeline.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Tasks2 from "../../components/Tasks/Tasks2";
import Tasks3 from "../../components/Tasks/Tasks3";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";

import { widgetStories, bugs, website, server } from "variables/general.js";

import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.js";
import ChartistGraph from "react-chartist";
import { simpleBarChart, straightLinesChart } from "../../variables/charts";
import CardFooter from "../../components/Card/CardFooter";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

const useStyles = makeStyles(styles);

export default function Widgets() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitleWhite}>Cultivo Tecnológico</h4>
                <h4 className={classes.cardCategoryWhite}>
                  Todo sobre los cultivos tecnológicos de frutales manejados por
                  FrutiControl.
                </h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <Table
                hover
                tableHeaderColor="warning"
                tableHead={["Fruto", "Subtipos", "Información"]}
                tableData={[
                  [
                    "Mango",
                    "Farchild - Tommy",
                    <a
                      href="http://www.asohofrucol.com.co/archivos/Libros/Cultivo_Tecnol%C3%B3gico_de_Mango_2017.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Click Aquí{" "}
                    </a>
                  ],
                  [
                    "Cítricos",
                    "Limón - Mandarina - Naranja",
                    <a
                      href="http://www.asohofrucol.com.co/archivos/Libros/Cultivo_Tecnol%C3%B3gico_de_C%C3%ADtricos_2017.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Click Aquí{" "}
                    </a>
                  ],
                  [
                    "Aguacate",
                    "Choquette - Papelillo - Criollo",
                    <a
                      href="http://www.asohofrucol.com.co/archivos/Libros/Cultivo_Tecnol%C3%B3gico_de_Aguacate_2017.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Click Aquí{" "}
                    </a>
                  ],
                  [
                    "Banano",
                    "Común",
                    <a
                      href="http://www.asohofrucol.com.co/archivos/Libros/Cartilla_Platanicultura_del_futuro_26-08-19.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Click Aquí{" "}
                    </a>
                  ]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Aspectos adicionales:"
            headerColor="rose"
            tabs={[
              {
                tabName: "Plagas",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Enfermedades",
                tabIcon: HealingIcon,
                tabContent: (
                  <Tasks2
                    checkedIndexes={[4, 7]}
                    tasksIndexes={[4, 5, 6, 7]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Otros",
                tabIcon: LocalLaundryServiceIcon,
                tabContent: (
                  <Tasks3
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                    className="fas fa-tractor"
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Timeline simple stories={widgetStories} />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer xs={12} item>
            <GridItem xs={12}>
              <Card chart className={classes.cardHover}>
                <CardHeader color="warning" className={classes.cardHeaderHover}>
                  <ChartistGraph
                    className="ct-chart-white-colors"
                    data={{
                      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
                      series: [[2545, 2545, 3455, 3455, 3455, 2850, 2850]]
                    }}
                    type="Line"
                    options={straightLinesChart.options}
                    responsiveOptions={straightLinesChart.responsiveOptions}
                    listener={straightLinesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Precio de Mango Tommy durante los últimos 7 días
                  </h4>
                  <p> Presentación: Caja - Cantidad: 11 - Unidad: Kilo </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <i className="fas fa-info-circle" />
                    <a href="https://www.corabastos.com.co/sitio/historicoApp2/reportes/prueba.php">
                      Tomado de Corabastos{" "}
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12}>
              <Card chart>
                <CardHeader color="info">
                  <ChartistGraph
                    className="ct-chart-white-colors"
                    data={{
                      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
                      series: [[900, 900, 900, 900, 900, 850, 850]]
                    }}
                    type="Line"
                    options={simpleBarChart.options}
                    responsiveOptions={simpleBarChart.responsiveOptions}
                    listener={simpleBarChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Precio de Naranja durante los últimos siete días
                  </h4>
                  <p> Presentación: Bulto - Cantidad: 50 - Unidad: Kilo </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <i className="fas fa-info-circle" />{" "}
                    <a href="https://www.corabastos.com.co/sitio/historicoApp2/reportes/prueba.php">
                      Tomado de Corabastos{" "}
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12}>
              <Card chart className={classes.cardHover}>
                <CardHeader color="warning" className={classes.cardHeaderHover}>
                  <ChartistGraph
                    className="ct-chart-white-colors"
                    data={{
                      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
                      series: [[2600, 2600, 2800, 2800, 2800, 2900, 2900]]
                    }}
                    type="Line"
                    options={straightLinesChart.options}
                    responsiveOptions={straightLinesChart.responsiveOptions}
                    listener={straightLinesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Precio de Aguacate durante los últimos 7 días
                  </h4>
                  <p> Presentación: Kilo - Cantidad: 1 - Unidad: Kilo </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <i className="fas fa-info-circle" />{" "}
                    <a href="https://www.corabastos.com.co/sitio/historicoApp2/reportes/prueba.php">
                      Tomado de Corabastos{" "}
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12}>
              <Card chart>
                <CardHeader color="info">
                  <ChartistGraph
                    className="ct-chart-white-colors"
                    data={{
                      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
                      series: [[1933, 1933, 1933, 1933, 1933, 1933, 1933]]
                    }}
                    type="Line"
                    options={simpleBarChart.options}
                    responsiveOptions={simpleBarChart.responsiveOptions}
                    listener={simpleBarChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Precio de Banano Criollo durante los últimos 7 días
                  </h4>
                  <p>
                    {" "}
                    Presentación: Caja de madera - Cantidad: 30 - Unidad: Kilo{" "}
                  </p>
                </CardBody>
                <CardFooter>
                  <div className={classes.stats}>
                    <i className="fas fa-info-circle" />{" "}
                    <a href="https://www.corabastos.com.co/sitio/historicoApp2/reportes/prueba.php">
                      Tomado de Corabastos{" "}
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
