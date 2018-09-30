import { createStore, combineReducers, applyMiddleware } from "redux";
import availShiftsReducer from "./reducers/availShifts";
import myShifts from "./reducers/myShifts";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import promise from "redux-promise";

const store = createStore(
  combineReducers({
    availShifts: availShiftsReducer,
    myShifts: myShifts
  }),
  applyMiddleware(thunk, logger, promise)
);

export default store;
