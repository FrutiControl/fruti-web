import React from "react";
import { connect } from "react-redux";
import { dashboard, owner } from "actions";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import InsertChartIcon from "@material-ui/icons/InsertChart";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Place from "@material-ui/icons/Place";
import UpdateIcon from "@material-ui/icons/Update";
import HomeIcon from "@material-ui/icons/Home";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import corpoica from "assets/img/corpoica.png";
import ministerio from "assets/img/minagricultura.png";
import asohofrucol from "assets/img/asohofrucol.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

const months = [
  "En",
  "Fe",
  "Ma",
  "Ab",
  "Ma",
  "Ju",
  "Ju",
  "Ag",
  "Se",
  "Oc",
  "No",
  "Di"
];

function Dashboard(props) {
  React.useEffect(() => {
    props.fetchDashboard();
    props.fetchOwner();
  }, []);
  const classes = useStyles();
  const sumActivities = last_activities => {
    let total_activities = 0;
    for (let day_activities of last_activities) {
      total_activities += day_activities;
    }
    return total_activities;
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon> library_add_check_icon </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Actividades en curso</p>
              <h3 className={classes.cardTitle}>
                {props.dashboard.current_activities} <small>Act.</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <UpdateIcon />
                </Danger>
                <div>Estado: En desarrollo</div>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <i className="fas fa-tree" />
              </CardIcon>
              <p className={classes.cardCategory}>Total de árboles</p>
              <h3 className={classes.cardTitle}>
                {props.dashboard.total_trees}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <HomeIcon />
                </Success>
                En todas las granjas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <i className="fas fa-arrow-right" />
              </CardIcon>
              <p className={classes.cardCategory}>Próximas actividades</p>
              <h3 className={classes.cardTitle}>
                {props.dashboard.future_activities}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Estado: No iniciadas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <i className="fas fa-cloud" />
              </CardIcon>
              <p className={classes.cardCategory}>Pronóstico de mañana</p>
              <h3 className={classes.cardTitle}>
                {props.dashboard.forecast[0]}C°
              </h3>
            </CardHeader>
            <CardFooter stats>
              <a
                className={classes.stats}
                href="https://darksky.net"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Update />
                Tomado de DarkSky
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} s={12} md={6}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <InsertChartIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Progreso de Actividades</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12}>
                  <Table
                    tableHead={["Actividad", "Fecha Fin", "Porcentaje"]}
                    tableData={mapTopActivities(props.dashboard.top_activities)}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} s={12} md={6}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <i className="fas fa-leaf" />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Árboles por tipo de fruto
              </h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                data={{
                  labels: [
                    props.dashboard.mango_trees > 0
                      ? `${Number.parseFloat(
                          props.dashboard.mango_trees
                        ).toFixed(0)}%`
                      : " ",
                    props.dashboard.banano_trees > 0
                      ? `${Number.parseFloat(
                          props.dashboard.banano_trees
                        ).toFixed(0)}%`
                      : " ",
                    props.dashboard.lemon_trees > 0
                      ? `${Number.parseFloat(
                          props.dashboard.lemon_trees
                        ).toFixed(0)}%`
                      : " ",
                    props.dashboard.orange_trees > 0
                      ? `${Number.parseFloat(
                          props.dashboard.orange_trees
                        ).toFixed(0)}%`
                      : " ",
                    props.dashboard.tangerine_trees > 0
                      ? `${Number.parseFloat(
                          props.dashboard.tangerine_trees
                        ).toFixed(0)}%`
                      : " ",
                    props.dashboard.avocado_trees > 0
                      ? `${Number.parseFloat(
                          props.dashboard.avocado_trees
                        ).toFixed(0)}%`
                      : " "
                  ],
                  series: [
                    props.dashboard.mango_trees,
                    props.dashboard.banano_trees,
                    props.dashboard.lemon_trees,
                    props.dashboard.orange_trees,
                    props.dashboard.tangerine_trees,
                    props.dashboard.avocado_trees
                  ]
                }}
                type="Pie"
                className={classes.pieStyle}
                options={{
                  height: "230px"
                }}
              />
            </CardBody>
            <CardFooter stats className={classes.cardFooter}>
              <i className={"fas fa-circle " + classes.lightBlue} /> Mango{` `}
              <i className={"fas fa-circle " + classes.lightRed} /> Banano
              {` `}
              <i className={"fas fa-circle " + classes.yellow} /> Limón
              {` `}
              <i className={"fas fa-circle " + classes.lightBrown} /> Naranja
              {` `}
              <i className={"fas fa-circle " + classes.darkBlue} /> Mandarina
              {` `}
              <i className={"fas fa-circle " + classes.darkGreen} /> Aguacate
              {` `}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={{
                  labels: mapDays(props.dashboard.last_days),
                  series: [props.dashboard.last_activities]
                }}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Ver Actividades"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link to="/admin/activities">
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-up" />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Actividades Completadas</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <i className="fas fa-check-circle" />
                </span>
                {` ${sumActivities(
                  props.dashboard.last_activities
                )} actividades completadas en los ultimos 7 días.`}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <i className="fas fa-info-circle" /> Gráfica de actividades
                completadas en la última semana.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={{
                  labels: months,
                  series: [props.dashboard.incomes]
                }}
                type="Bar"
                options={{
                  axisX: {
                    showGrid: false
                  },
                  low: 0,
                  high: Math.max(...props.dashboard.incomes) * 1.5,
                  chartPadding: {
                    top: 0,
                    right: 2.5,
                    bottom: 0,
                    left: 15
                  }
                }}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Ver datos de ingresos"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link to="/admin/incomes">
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-up" />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Ingresos</h4>
              {/* <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                de incremento en los ingresos.
              </p>*/}
              <p className={classes.cardCategory}>
                Ingresos recibidos por la venta de frutos
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <i className="fas fa-info-circle" />
                Gráfica de ingresos a lo largo de los meses
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={{
                  labels: months,
                  series: [props.dashboard.outcomes]
                }}
                type="Bar"
                options={{
                  axisX: {
                    showGrid: false
                  },
                  low: 0,
                  high: Math.max(...props.dashboard.outcomes) * 1.5,
                  chartPadding: {
                    top: 0,
                    right: 2.5,
                    bottom: 0,
                    left: 15
                  }
                }}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Ver datos de gastos"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link to="/admin/outcomes">
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-up" />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Gastos</h4>
              {/*<p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowDownwardIcon className={classes.upArrowCardCategory} />{" "}
                  25%
                </span>{" "}
                de disminución en los gastos.
              </p>*/}
              <p className={classes.cardCategory}>
                Gastos en materiales y mano de obra por la realización de
                actividades
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <i className="fas fa-info-circle" /> Gráfica de gastos a lo
                largo de los meses.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <h3>Enlaces de Interés</h3>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a
                href="http://web.corpoica.org.co/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={corpoica} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Siembra"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <a
                    href="http://www.siembra.gov.co/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-left" />
                    </Button>
                  </a>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="MAPA"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <a
                    href="http://web.corpoica.org.co/site-mapa/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-right" />
                    </Button>
                  </a>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a
                  href="http://web.corpoica.org.co/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Corpoica - Agrosavia
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                La Corporación Colombiana de Investigación Agropecuaria,
                AGROSAVIA, tiene como objeto desarrollar y ejecutar actividades
                de Investigación, Tecnología y transferir procesos de Innovación
                tecnológica al sector agropecuario.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>Investigación</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Colombia
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a
                href="http://www.asohofrucol.com.co/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={asohofrucol} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Facebook"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <a
                    href="https://www.facebook.com/asohofrucol/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button color="transparent">
                      <i className="fab fa-facebook-square" />
                    </Button>
                  </a>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="YouTube"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <a
                    href="https://www.youtube.com/user/AsohofrucolFNFH"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button color="transparent">
                      <i className="fab fa-youtube" />
                    </Button>
                  </a>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a
                  href="http://www.asohofrucol.com.co/"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={e => e.preventDefault()}
                >
                  Asohofrucol
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Asohofrucol es el fondo nacional de fomento frutícola. Tiene
                como objetivo identificar las necesidades de los productores
                hortifrutícolas asi como representar, asesorar y defender los
                intereses de los productores de frutas y hortalizas del país
                ante las entidades.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>Gremio</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Colombia
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a
                href="https://www.minagricultura.gov.co/paginas/default.aspx"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={ministerio} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Agronet"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <a
                    href="https://www.agronet.gov.co/Paginas/inicio.aspx"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-left" />
                    </Button>
                  </a>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Colombia Siembra"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <a
                    href="https://www.minagricultura.gov.co/Colombia-Siembra/Paginas/default.aspx"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button color="transparent">
                      <i className="fas fa-arrow-circle-right" />
                    </Button>
                  </a>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a
                  href="https://www.minagricultura.gov.co/paginas/default.aspx"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={e => e.preventDefault()}
                >
                  Ministerio de Agricultura
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Es un Ministerio de la República de Colombia que tiene como
                objetivos primordiales la formulación, coordinación y adopción
                de las políticas, planes, programas y proyectos del Sector
                Agropecuario, Pesquero y de Desarrollo Rural.​
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>Sector Público</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Colombia
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapDays = days => {
  return days.map(day => {
    switch (day) {
      case "Monday":
        return "L";
      case "Tuesday":
        return "M";
      case "Wednesday":
        return "Mi";
      case "Thursday":
        return "J";
      case "Friday":
        return "V";
      case "Saturday":
        return "S";
      case "Sunday":
        return "D";
      default:
        return " ";
    }
  });
};
const mapTopActivities = top_activities => {
  return top_activities.map(activity => {
    return [
      activity[3] + mapActType(activity[3], activity[2]),
      activity[0],
      `${Number(activity[4] * 100).toFixed(0)}%`
    ];
  });
};
const mapActType = (act, type) => {
  switch (act) {
    case "Poda":
      switch (type) {
        case "S":
          return " sanitaria";
        case "F":
          return " de formación";
        case "M":
          return " de mantenimiento";
        case "L":
          return " de limpieza";
        default:
          return " ";
      }
    case "Fertilización":
      switch (type) {
        case "C":
          return " para crecimiento";
        case "P":
          return " para producción";
        case "M":
          return " para mantenimiento";
        default:
          return " ";
      }
    case "Fumigación":
      switch (type) {
        case "I":
          return " contra insectos";
        case "F":
          return " contra hongo";
        case "H":
          return " contra hierba";
        case "A":
          return " contra ácaros";
        case "P":
          return " contra peste";
        default:
          return " ";
      }
    case "Riego":
      switch (type) {
        case "N":
          return " ";
        case "S":
          return " con sistema";
        case "M":
          return " manual";
        default:
          return " ";
      }
    case "Siembra":
      switch (type) {
        case "M":
          return " de mango Tommy";
        case "F":
          return " de mango Farchild";
        case "N":
          return " de naranjos";
        case "A":
          return " de aguacates";
        case "D":
          return " de mandarinas";
        case "L":
          return " de limones";
        case "B":
          return " de bananos";
        default:
          return " ";
      }
    default:
      return " ";
  }
};
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    dashboard: state.dashboard
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchDashboard: () => dispatch(dashboard.fetchDashboard()),
    fetchOwner: () => dispatch(owner.fetchOwner())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
