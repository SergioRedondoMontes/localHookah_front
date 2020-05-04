import React, { Component } from "react";
import { Calendar } from "core/Calendar";
import moment from "moment";
import events from "core/Calendar/events";

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
    };
  }

  handleSelect = ({ start, end }) => {
    console.log("events");
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  };

  render() {
    return (
      <div>
        <Calendar
          date={moment()}
          selectable
          onSelectEvent={(event) => console.log("entro", event)}
          onSelectSlot={this.handleSelect}
          events={this.state.events}
        />
      </div>
    );
  }
}

export { CalendarPage };
