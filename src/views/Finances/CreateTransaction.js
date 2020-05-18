import React from "react";

// core components
import CreateTransaction from "../../components/Finance/CreateTransaction";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Finances/WizardSteps/Step1.js";
import Step2 from "views/Finances/WizardSteps/Step2.js";

export default function CreateTransactionView() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <CreateTransaction
          validate={false}
          steps={[
            {
              stepName: "Nuevo Ingreso",
              stepComponent: Step1,
              stepId: "incomes"
            },
            { stepName: "Nuevo Gasto", stepComponent: Step2, stepId: "outcomes" }
          ]}
          title="Crear Ingreso o Gasto"
          subtitle="Ingrese los datos correspondientes en el formato para registrar sus ingresos o gastos."
          finishButtonClick={e => alert(JSON.stringify(e))}
        />
      </GridItem>
    </GridContainer>
  );
}
