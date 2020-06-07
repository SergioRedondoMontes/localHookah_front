import React, { useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./styles.css";
import { useState } from "react";

const messagesDefault = {
  date: "Date",
  time: "Time",
  event: "Event",
  allDay: "All Day",
  week: "Week",
  work_week: "Work Week",
  day: "Day",
  month: "Month",
  previous: "Back",
  next: "Next",
  yesterday: "Yesterday",
  tomorrow: "Tomorrow",
  today: "Today",
  agenda: "Agenda",
  noEventsInRange: "There are no events in this range.",
  showMore: function (e) {
    return "+" + e + " more";
  },
};

const Calendar = (props) => {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    props.date ? setDate(moment(props.date).toDate()) : setDate(moment());
  }, [props.date]);

  return (
    <div style={{ height: "90vh" }}>
      <BigCalendar
        localizer={momentLocalizer(moment)}
        culture="es"
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={(_date) => {
          setDate(_date);
        }}
        defaultView={props.defaultView || "day"}
        onSelectEvent={props.onSelectEvent || null}
        messages={props.messages || messagesDefault}
        selectable={props.selectable}
        onSelectSlot={props.onSelectSlot}
      />
    </div>
  );
};

export { Calendar };
