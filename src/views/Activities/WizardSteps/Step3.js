import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
    fontSize: "16px"
  },
  label: {
    fontFamily: "Helvetica",
    fontSize: "15px",
    color: "#a8abae"
  },
  ...customSelectStyle
};

class Step3 extends React.Component {
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
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Si va a sembrar más de un árbol, seleccione la distancia entre los
            árboles a sembrar
          </h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <CustomInput
            className={classes.infoText}
            labelText="Distancia (metros)"
            id="streetname"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8}>
          <h5 className={classes.label}>
            Total de árboles que puede sembrar en el polígono:{" "}
          </h5>
        </GridItem>
      </GridContainer>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step3);
