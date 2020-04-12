import React, { Component } from "react";
import { Calendar } from "core/Calendar";
import moment from "moment";

class CalendarPage extends Component {
  render() {
    return (
      <div>
        <Calendar date={moment()} />
      </div>
    );
  }
}

export { CalendarPage };
