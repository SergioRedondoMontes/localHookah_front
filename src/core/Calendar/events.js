import moment from "moment";

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    start: moment().toDate(),
    end: moment().add(2, "h").toDate(),
  },
];
