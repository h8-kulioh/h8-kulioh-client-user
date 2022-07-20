import { combineReducers } from "redux";
import dailyQReducer from "./dailyQReducer";
import toDoReducer from "./toDoReducer";
import univReducer from "./univReducer";
import weeklyQReducer from "./weeklyQReducer";

export default combineReducers({
  dailyQReducer,
  toDoReducer,
  univReducer,
  weeklyQReducer,
});
