import React, { Component } from "react";
import rootRoutes from "./components/admin/rootRoutes";
import Auth from "./components/auth";
import NoMatch from "./components/nomatch";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
// import PrivateRoute from './components/auth/PrivateRoute';
import { getCookie } from "./function";

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useState } from "react";

const App = () => {
  const [auth, setAuth]= useState(true)
  return (
    <div className="App">
      <BrowserRouter>
        <NotificationContainer />
        <Switch>
          <Route path="/auth" component={Auth} />
			{/* getCookie("token") */}
          {auth=== true ? (
            <Route path="/admin" component={rootRoutes} />
          ) : (
            <Redirect to={"/auth/login"} />
          )}
          {auth=== true ? (
            <Redirect to={"/admin"} />
          ) : (
            <Redirect to={"/auth/login"} />
          )}
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App