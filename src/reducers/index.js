import { combineReducers } from "redux";
import auth from "./auth";
import trees from "./trees";
import farms from "./farms";
import dashboard from "./dashboard";

const frutiApp = combineReducers({
  auth,
  trees,
  dashboard,
  farms
});
export default frutiApp;
