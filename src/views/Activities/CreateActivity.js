import React from "react";

// core components
import CreateActivity from "../../components/Activity/CreateActivity.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Activities/WizardSteps/Step1.js";
import Step2 from "views/Activities/WizardSteps/Step2.js";
import { connect } from "react-redux";

function CreateActivityView(props) {
  const [update, setUpdate] = React.useState(false);
  React.useEffect(() => {
    setUpdate(props.update.id);
  }, []);
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <CreateActivity
          validate
          steps={[
            {
              stepName: "Actividad",
              stepComponent: Step1,
              stepId: "act_chars"
            },
            {
              stepName: "Seleccionar Árboles",
              stepComponent: Step2,
              stepId: "act_trees"
            }
          ]}
          title={`${update ? "Modificar" : "Crear"} Actividad`}
          subtitle={`${
            update
              ? "Visualice y modifique los datos de su actividad. Registre el progreso realizado."
              : "Ingrese los datos correspondientes en el formato para su nueva actividad."
          }`}
          finishButtonClick={e => alert(e)}
          finishButtonText={`${update ? "Modificar" : "Crear"} Actividad`}
        />
      </GridItem>
    </GridContainer>
  );
}
const mapStateToProps = state => {
  return {
    update: state.updates
  };
};
export default connect(
  mapStateToProps,
  null
)(CreateActivityView);
