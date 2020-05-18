import React from "react";

// core components
import CreateTree from "../../components/Tree/CreateTree.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Trees/WizardSteps/Step1.js";
import Step2 from "views/Trees/WizardSteps/Step2.js";

export default function CreateTreeView() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <CreateTree
          validate
          steps={[
            {
              stepName: "Información Básica",
              stepComponent: Step1,
              stepId: "tree_chars"
            },
            {
              stepName: "Ubicación Árbol",
              stepComponent: Step2,
              stepId: "trees"
            }
          ]}
          title="Crear Árbol"
          subtitle="Ingrese los datos correspondientes en el formato para su nuevo árbol."
          finishButtonClick={e => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
