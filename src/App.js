import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CalendarPage } from "./Pages/Calendar";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/calendar" />
        </Route>
        <Route path="/calendar" exact component={CalendarPage} />
      </Switch>
    );
  }
}

export default App;
