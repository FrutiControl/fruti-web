import { combineReducers } from "redux";
import auth from "./auth";
import trees from "./trees";

const frutiApp = combineReducers({
  auth,
  trees
});
export default frutiApp;
