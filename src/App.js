import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CalendarPage } from "./Pages/Calendar";
import SignInSide from "Pages/Login";

import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          {localStorage.getItem("hookah-jwt") ? (
            <Redirect to="/calendar" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/calendar" exact component={CalendarPage} />
        <Route path="/login" exact component={SignInSide} />
      </Switch>
    );
  }
}

export default withRouter(App);
