import { combineReducers } from "redux";
import auth from "./auth";
import owner from "./owner";
import trees from "./trees";
import farms from "./farms";
import incomes from "./incomes";
import outcomes from "./outcomes";
import dashboard from "./dashboard";

const frutiApp = combineReducers({
  auth,
  owner,
  trees,
  farms,
  incomes,
  outcomes,
  dashboard,
});
export default frutiApp;
