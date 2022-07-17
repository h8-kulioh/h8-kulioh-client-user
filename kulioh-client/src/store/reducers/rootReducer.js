import { combineReducers } from "redux";
import dailyQReducer from "./dailyQReducer";
import toDoReducer from "./toDoReducer";
import univReducer from "./univReducer";

export default combineReducers({
  dailyQReducer,
  toDoReducer,
  univReducer,
});
