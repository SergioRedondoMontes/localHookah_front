import React, { useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./styles.css";
import { useState } from "react";
import events from "./events";

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
  //   const { variant, events } = props;
  const [date, setDate] = useState(moment());

  useEffect(() => {
    props.date ? setDate(moment(props.date).toDate()) : setDate(moment());
  }, [props.date]);

  //   let componentAgenda = null;

  //   if (!componentAgenda) {
  //     console.log("rendering variant calendar");

  //     switch (variant) {
  //       case "projects":
  //         componentAgenda = event => (
  //           <EventAgendaProjects
  //             onClickEventAgenda={props.onClickEventAgenda}
  //             event={event}
  //           />
  //         );
  //         break;

  //       default:
  //         // console.log("Not supported variant", props.variant);
  //         break;
  //     }
  //   }

  return (
    <div style={{ height: "80vh" }}>
      <BigCalendar
        localizer={momentLocalizer(moment)}
        culture="es"
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={(_date) => {
          console.log(_date);
          setDate(_date);
        }}
        defaultView={props.defaultView || "day"}
        onSelectEvent={props.onSelectEvent || null}
        // components={{
        //   agenda: {
        //     event: componentAgenda
        //   }
        // }}
        messages={props.messages || messagesDefault}
      />
    </div>
  );
};

export { Calendar };
