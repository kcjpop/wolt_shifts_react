import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import AppRouter from "./components/router";
import registerServiceWorker from "./registerServiceWorker";
import store from "./configStore";
import { Provider } from "react-redux";
import { getAvailShiftsAsync } from "./actions/availShifts";

store.dispatch(getAvailShiftsAsync());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
registerServiceWorker();
