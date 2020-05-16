import React from "react";
import {
  seedings,
  fumigations,
  fertilizations,
  prunings,
  waterings
} from "actions";
import { connect } from "react-redux";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
import "moment/locale/es";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(styles);

function Calendar(props) {
  const classes = useStyles();
  const [events, setEvents] = React.useState([]);
  const mapActivities = myActivities => {
    return myActivities.map(activity => {
      return {
        title: `${activity.name}${mapActType(activity.name, activity.type)}`,
        allDay: true,
        start: moment(activity.start_date, "YYYY-MM-DD"),
        end: moment(activity.end_date, "YYYY-MM-DD").add(1, "days"),
        color: mapActColor(activity.name),
        id: activity.id,
        progress: activity.progress,
        farm: activity.farm
      };
    });
  };
  React.useEffect(() => {
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Buscar...";
    }
    props.fetchSeedings();
    props.fetchWaterings();
    props.fetchPrunings();
    props.fetchFumigations();
    props.fetchFertilizations();
  }, []);
  React.useEffect(() => {
    setEvents(
      mapActivities([
        ...props.waterings,
        ...props.prunings,
        ...props.fertilizations,
        ...props.fumigations,
        ...props.seedings
      ])
    );
  }, [
    props.waterings,
    props.prunings,
    props.fertilizations,
    props.fumigations,
    props.seedings
  ]);
  console.log(`EVENTOS ${JSON.stringify(events)}`);
  const selectedEvent = event => {
    window.alert(event.title);
  };
  const eventColors = event => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };
  return (
    <div>
      <Heading
        textAlign="center"
        title="Mi Calendario de Actividades"
        category={
          <span>
            El Calendario tiene todas las actividades disponibles para
            visualizar.
          </span>
        }
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardBody calendar>
              <BigCalendar
                messages={{
                  next: "Siguiente",
                  previous: "Atrás",
                  today: "Hoy",
                  month: "Mes",
                  week: "Semana",
                  day: "Dia",
                  date: "Fecha",
                  time: "Hora",
                  event: "Actividad",
                  yesterday: "Ayer",
                  tomorrow: "Mañana",
                  allDay: "Todo el día",
                  noEventsInRange:
                    "No hay actividades para realizar en esta franja."
                }}
                localizer={localizer}
                events={events}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={event => selectedEvent(event)}
                // onSelectSlot={}
                eventPropGetter={eventColors}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
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
const mapActColor = act => {
  switch (act) {
    case "Poda":
      return "green";
    case "Fertilización":
      return "rose";
    case "Fumigación":
      return "orange";
    case "Riego":
      return "azure";
    case "Siembra":
      return "default";
    default:
      return " ";
  }
};
const mapStateToProps = state => {
  return {
    waterings: state.waterings,
    seedings: state.seedings,
    prunings: state.prunings,
    fertilizations: state.fertilizations,
    fumigations: state.fumigations,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSeedings: () => dispatch(seedings.fetchSeedings()),
    fetchWaterings: () => dispatch(waterings.fetchWaterings()),
    fetchPrunings: () => dispatch(prunings.fetchPrunings()),
    fetchFumigations: () => dispatch(fumigations.fetchFumigations()),
    fetchFertilizations: () => dispatch(fertilizations.fetchFertilizations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
