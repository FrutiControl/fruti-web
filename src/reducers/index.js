import { combineReducers } from "redux";
import auth from "./auth";
import trees from "./trees";
import farms from "./farms";
import incomes from "./incomes";
import dashboard from "./dashboard";

const frutiApp = combineReducers({
  auth,
  trees,
  farms,
  incomes,
  dashboard,
});
export default frutiApp;
