import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Landing/Grid/GridContainer.js";
import GridItem from "components/Landing/Grid/GridItem.js";
import Button from "components/Landing/CustomButtons/Button.js";
import Card from "components/Landing/Card/Card.js";
import CardBody from "components/Landing/Card/CardBody.js";
import CardFooter from "components/Landing/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/diego.jpg";
import team3 from "assets/img/faces/michael.jpg";
import team4 from "assets/img/faces/carlos.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Nuestro Equipo</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Valentina Escobar
                <br />
                <small className={classes.smallTitle}>CTO y desarrolladora</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Estudiante de Ingeniería de Sistemas de de la Pontificia Universidad Javeriana. Practicante de Accenture.
                  <br />Co-fundadora de FrutiControl.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  href = "https://github.com/valentinaescobarg"
                  target="_blank"
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  justIcon
                  href = "https://www.linkedin.com/in/valentina-escobar-g%C3%B3mez-b700291a4/"
                  target="_blank"
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Diego Guevara
                <br />
                <small className={classes.smallTitle}>CEO y desarrollador</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Estudiante de Ingeniería de Sistemas de de la Pontificia Universidad Javeriana.
                  Desarrollador Web FullStack. Co-fundador de FrutiControl.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  href="https://github.com/diegogguevarab"
                  target="_blank"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  justIcon
                  href="https://www.linkedin.com/in/diegogguevarab/"
                  target="_blank"
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Michael Rincon
                <br />
                <small className={classes.smallTitle}>CCO y desarrollador</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Estudiante de Ingeniería de Sistemas de de la Pontificia Universidad Javeriana. Practicante en Homecenter.
                  <br />Co-fundador de FrutiControl.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  href ="https://github.com/michaelrincon"
                  target="_blank"
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team4} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Carlos Yañez
                <br />
                <small className={classes.smallTitle}>VP Ingeniería y desarrollador</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Estudiante de Ingeniería de Sistemas de de la Pontificia Universidad Javeriana. Practicante en Ban. Santander.
                  <br />Co-fundador de FrutiControl.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                    justIcon
                    href = "https://github.com/gitAccCarlo"
                    target="_blank"
                    color="transparent"
                    className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                    justIcon
                    href = "https://www.linkedin.com/in/carlos-david-705803191/"
                    target="_blank"
                    color="transparent"
                    className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
