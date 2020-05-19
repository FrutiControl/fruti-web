import React from "react";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step3 from "views/Activities/WizardSteps/Step3.js";
import CreateSeeding from "components/Activity/CreateSeeding";

export default function CreateSeedingView() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <CreateSeeding
          validate
          steps={[
            {
              stepName: "Detalles Siembra",
              stepComponent: Step3,
              stepId: "activities"
            }
          ]}
          title="Crear Siembra"
          subtitle="Ingrese los datos correspondientes en el formato para su nueva actividad."
          finishButtonClick={e => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
