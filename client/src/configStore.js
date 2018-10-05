import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { logger } from "redux-logger"
import availShiftsReducer from "./reducers/availShifts"

// https://github.com/reduxjs/redux-thunk

const store = createStore(availShiftsReducer, applyMiddleware(thunk, logger))

export default store
