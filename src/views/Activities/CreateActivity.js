import React from "react";

// core components
import CreateActivity from "../../components/Activity/CreateActivity.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Activities/WizardSteps/Step1.js";
import Step2 from "views/Activities/WizardSteps/Step2.js";
import Step3 from "views/Activities/WizardSteps/Step3.js";

export default function CreateActivityView() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <CreateActivity
          validate
          steps={[
            { stepName: "Actividad", stepComponent: Step1, stepId: "about" },
            {
              stepName: "Seleccionar Árboles",
              stepComponent: Step2,
              stepId: "account"
            },
            {
              stepName: "Detalles Siembra",
              stepComponent: Step3,
              stepId: "address"
            }
          ]}
          title="Crear Actividad"
          subtitle="Ingrese los datos correspondientes en el formato para su nueva actividad."
          finishButtonClick={e => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
