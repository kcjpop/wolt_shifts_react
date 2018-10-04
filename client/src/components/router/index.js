import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MyShifts from "../myshifts/MyShifts";
import AvailShifts from "../availshifts/AvailShifts";
import Nav from "../Nav";
import PageNotFound from "../PageNotFound";

const AppRouter = () => {
  const suppoertsHisotry = "pushState" in window.history;
  return (
    <div>
      <BrowserRouter forceRefresh={!suppoertsHisotry}>
        <div>
          <Route path="/(myshift|availshift)/" component={Nav} />
          <Switch>
            <Route path="/myshift" component={MyShifts} />
            <Redirect exact from="/" to="/myshift" />

            <Route
              path="/availshift/(Helsinki|Tampere|Turku)"
              component={AvailShifts}
            />
            <Redirect exact from="/availshift" to="/availshift/Helsinki" />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
