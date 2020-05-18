import React from "react";

// core components
import CreateFarm from "../../components/Farm/CreateFarm";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Farms/Step1.js";

export default function CreateFarmView() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <CreateFarm
          validate
          steps={[
            {
              stepName: "Información Básica",
              stepComponent: Step1,
              stepId: "farms"
            }
          ]}
          title="Crear Granja"
          subtitle="Ingrese los datos correspondientes en la forma para su nueva granja."
          finishButtonClick={e => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
