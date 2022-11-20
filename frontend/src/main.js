/* eslint-disable */
import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/login";
// import Signup from "./components/signup";
import Landing from "./components/landing";
import TimeSeries from "./components/TIMESERIES/timeseries";

const Main = () => (
  <>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" component={Login} />
      {/* <Route path="/signup" component={Signup} /> */}
      <Route path="/home" component={TimeSeries} />
    </Switch>
  </>
);

export default Main;