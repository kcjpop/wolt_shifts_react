import { createStore, combineReducers, applyMiddleware } from "redux";
import availShiftsReducer from "./reducers/availShifts";
import myShifts from "./reducers/myShifts";
// import bookShiftsReducer from "./reducers/bookShifts";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import promise from "redux-promise";

// https://github.com/reduxjs/redux-thunk

const store = createStore(
  combineReducers({
    availShifts: availShiftsReducer,
    myShifts: myShifts,

  }),
  applyMiddleware(thunk, logger, promise)
);

export default store;
