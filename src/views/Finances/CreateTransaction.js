import React from "react";


// core components
import CreateTransaction from "../../components/Finance/CreateTransaction";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Finances/WizardSteps/Step1.js";
import Step2 from "views/Finances/WizardSteps/Step2.js";
import Step3 from "views/Finances/WizardSteps/Step3.js";


export default function CreateTransactionView() {
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
                <CreateTransaction
                    validate
                    steps={[
                        { stepName: "About", stepComponent: Step1, stepId: "about" },
                        { stepName: "Account", stepComponent: Step2, stepId: "account" },
                        { stepName: "Address", stepComponent: Step3, stepId: "address" }
                    ]}
                    title="Crear Ingresos y Gastos"
                    subtitle="Ingrese los datos correspondientes en la forma para registrar sus ingresos o gastos."
                    finishButtonClick={e => alert(e)}
                />
            </GridItem>
        </GridContainer>
    );
}
