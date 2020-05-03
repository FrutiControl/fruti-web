import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Decisiones from "assets/img/decisiones.png";
import Contabilidad from "assets/img/contabilidad.png";
import Monitoreo from "assets/img/monitoreo.png";
// core components
import GridContainer from "components/Landing/Grid/GridContainer.js";
import GridItem from "components/Landing/Grid/GridItem.js";
import InfoArea from "components/Landing/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section} id={"product"}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Acerca del producto</h2>
          <h5 className={classes.description}>
            FrutiControl es un sistema de información enfocado al monitoreo de árboles frutales para los campesinos
            de fincas productivas, con el fin de ayudarlos a llevar un mejor control sobre actividades productivas
            y apoyar la toma de decisiones de los usuarios.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Control de Árboles Frutales"
              description="Contribuye a llevar un seguimiento de las actividades productivas realizadas a los árboles
              frutales del usuario."
              icon={Monitoreo}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Toma de decisiones"
              description="Al lograr optimizar el uso de insumos agrícolas y el tiempo de mano de obra empleado en cada actividad
              realizada en el cultivo el usuario está en capacidad de tomar decisiones."
              icon={Decisiones}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Control de presupuesto"
              description="Realiza un control de ingresos y gastos para realizar un seguimiento de los costos de cada actividad productiva
               y calcula un presupuesto estimado de costos en todo el ciclo de producción."
              icon={Contabilidad}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
