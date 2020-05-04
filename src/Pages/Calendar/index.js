import React, { Component } from "react";
import { Calendar } from "core/Calendar";
import moment from "moment";
import events from "core/Calendar/events";
import Dialog from "Organisms/Dialog";
import { Grid, TextField } from "@material-ui/core";
import { DatePicker } from "core/DatePicker";
import { TimePicker } from "core/TimePicker";
import { v1 } from "uuid";

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      form: {
        date: null,
        start: null,
        end: null,
        numPeople: 0,
        name: "",
        comments: "",
        zone: null,
      },
      open: false,
    };
  }

  handleDialog = () => {
    this.setState({ open: !this.state.open });
  };

  handleSelect = ({ start, end }) => {
    let auxDate = moment(start);
    let auxStart = moment(start);
    let auxEnd = moment(end);

    this.setState(
      {
        form: { date: auxDate, start: auxStart, end: auxEnd },
      },
      () => {
        this.handleDialog();
      }
    );
  };

  handleChangeDate = (date, id) => {
    const form = this.state.form;
    form[id] = date;
    this.setState({ form });
  };

  handleChangeInput = (event) => {
    const form = this.state.form;
    form[event.target.name] = event.target.value;
    this.setState({ form });
  };

  handleSubmit = () => {
    console.log("entro");
    const events = this.state.events;
    events.push({
      id: v1(),
      title: this.state.form.name,
      start: this.state.form.start.toDate(),
      end: this.state.form.end.toDate(),
    });
    this.setState(
      {
        events,
        form: {
          date: null,
          start: null,
          end: null,
          numPeople: 0,
          name: "",
          comments: "",
          zone: null,
        },
      },
      () => {
        this.handleDialog();
      }
    );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {/* Dialog añadir reservas */}
        <Dialog
          open={this.state.open}
          onClose={this.handleDialog}
          onSubmit={this.handleSubmit}
          title="Añadir reserva"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker
                date={this.state.form.date}
                variant="dialog"
                format="DD/MM/YYYY"
                onChangeDate={(date) => {
                  this.handleChangeDate(date, "date");
                }}
                style={{ width: "100%" }}
                okLabel="Aceptar"
                cancelLabel="Cancelar"
                invalidDateMessage="Fecha incorrecta"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                clearable
                ampm={false}
                label="Inicio"
                date={this.state.form.start}
                onChangeDate={(date) => {
                  this.handleChangeDate(date, "start");
                }}
                margin="normal"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                clearable
                ampm={false}
                label="Fin"
                date={this.state.form.end}
                onChangeDate={(date) => {
                  this.handleChangeDate(date, "end");
                }}
                margin="normal"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Nombre"
                name="name"
                value={this.state.form.name}
                placeholder="Añade el nombre"
                onChange={this.handleChangeInput}
                margin="normal"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Nº Personas"
                name="numPeople"
                type="number"
                value={this.state.form.numPeople}
                placeholder="Indica el numero de personas"
                onChange={this.handleChangeInput}
                margin="normal"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Comentarios"
                name="comments"
                value={this.state.form.comments}
                multiline
                rows={3}
                placeholder="Añade un comentario"
                onChange={this.handleChangeInput}
                margin="normal"
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
        </Dialog>
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
