import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
//import { createRef } from "react";
import Header from "components/Landing/Header/Header.js";
import Footer from "components/Landing/Footer/Footer.js";
import GridContainer from "components/Landing/Grid/GridContainer.js";
import GridItem from "components/Landing/Grid/GridItem.js";
import Button from "components/Landing/CustomButtons/Button.js";
import HeaderLinks from "components/Landing/Header/HeaderLinks.js";
import Parallax from "components/Landing/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

    return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="FrutiControl"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 250,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Monitorea tu cultivo.</h1>
              <h4 className={classes.justify}>
                FrutiControl reúne funcionalidades como visualización de mapas, calendario y cálculo de costos, que contribuyen
                  a tener información organizada y tener un panorama real de las actividades diarias en el campo.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="#product"
              >
                Más información
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection id={'producto'}/>
          <TeamSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
