import React from "react";


// core components
import CreateActivity from "../../components/Activity/CreateActivity.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Forms/WizardSteps/Step1.js";
import Step2 from "views/Forms/WizardSteps/Step2.js";
import Step3 from "views/Forms/WizardSteps/Step3.js";


export default function CreateActivityView() {
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
                <CreateActivity
                    validate
                    steps={[
                        { stepName: "About", stepComponent: Step1, stepId: "about" },
                        { stepName: "Account", stepComponent: Step2, stepId: "account" },
                        { stepName: "Address", stepComponent: Step3, stepId: "address" }
                    ]}
                    title="Crear Actividad"
                    subtitle="Ingrese los datos correspondientes en la forma para su nueva actividad."
                    finishButtonClick={e => alert(e)}
                />
            </GridItem>
        </GridContainer>
    );
}
