import React from "react";

// core components
import CreateTree from "../../components/Tree/CreateTree.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "views/Trees/WizardSteps/Step1.js";
import Step2 from "views/Trees/WizardSteps/Step2.js";
import { connect } from "react-redux";

function CreateTreeView(props) {
  const [update, setUpdate] = React.useState(false);
  React.useEffect(() => {
    setUpdate(props.update.id);
  }, []);
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
          title={`${update ? "Modificar" : "Crear"} Árbol`}
          subtitle={`${
            update
              ? "Visualice y modifique los datos de su árbol."
              : "Ingrese los datos correspondientes en el formato para su nuevo árbol."
          }`}
          finishButtonClick={e => alert(e)}
          finishButtonText={`${update ? "Modificar" : "Crear"} Árbol`}
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
)(CreateTreeView);
