import { combineReducers } from "redux";
import auth from "./auth";
import owner from "./owner";
import trees from "./trees";
import farms from "./farms";
import seedings from "./seedings";
import fertilizations from "./fertilizations";
import fumigations from "./fumigations";
import prunings from "./prunings";
import waterings from "./waterings";
import recollections from "./recollections";
import incomes from "./incomes";
import outcomes from "./outcomes";
import dashboard from "./dashboard";
import updates from "./updates";

const frutiApp = combineReducers({
  auth,
  owner,
  trees,
  farms,
  seedings,
  fertilizations,
  fumigations,
  prunings,
  waterings,
  recollections,
  incomes,
  outcomes,
  dashboard,
  updates
});
export default frutiApp;
