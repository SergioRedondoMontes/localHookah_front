import React, { Component } from "react";
import { Calendar } from "core/Calendar";
import Select from "@material-ui/core/Select";
import moment from "moment";
import events from "core/Calendar/events";
import Dialog from "Organisms/Dialog";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";
import { DatePicker } from "core/DatePicker";
import { TimePicker } from "core/TimePicker";
import { v1 } from "uuid";
import BookingServices from "services/booking.services";
import zones from "core/Zones";
import { Redirect } from "react-router-dom";
import { AppBar } from "Organisms/AppBar";

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
      eventSelected: null,
      openEdit: false,
      openView: false,
    };
    this.bookingService = new BookingServices();
  }

  componentDidMount() {
    this.bookingService.getBooking().then((response) => {
      const events = response.data.bookings.map((event) => ({
        id: event.id,
        idZone: event.idZone,
        title: event.title || "",
        comments: event.comments,
        start: moment(event.date).add(-2, "h").toDate(),
        end: moment(event.date).toDate(),
      }));
      this.setState({ events });
    });
  }

  handleEditDialog = () => {
    this.setState({ openEdit: !this.state.openEdit });
  };

  handleViewDialog = () => {
    this.setState({ openView: !this.state.openView });
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
        this.handleEditDialog();
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

    this.bookingService
      .postBooking({
        zone: this.state.form.zone + "",
        title: this.state.form.name,
        people: this.state.form.numPeople,
        comments: this.state.form.comments,
        date: moment(this.state.form.date)
          .add(2, "h")
          .format("YYYY-MM-DD HH:mm"),
      })
      .then((response) => {
        events.push({
          id: response.data.id,
          title: this.state.form.name,
          start: this.state.form.start.toDate(),
          end: this.state.form.start.add(2, "h").toDate(),
        });
        this.setState(
          {
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
            this.handleEditDialog();
          }
        );
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <AppBar />
        {!localStorage.getItem("hookah-jwt") && <Redirect to="/" />}
        {/* Dialog añadir reservas */}
        <Dialog
          open={this.state.openEdit}
          onClose={this.handleEditDialog}
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
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", alignItems: "center" }}
            >
              <FormControl style={{ width: "100%" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ paddingLeft: "8px" }}
                >
                  Zona
                </InputLabel>
                <Select
                  name="zone"
                  value={this.state.form.zone}
                  onChange={this.handleChangeInput}
                  fullWidth
                  variant="outlined"
                  margin="none"
                >
                  {zones.map((zone) => (
                    <MenuItem value={zone.value}>{zone.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        {/* Dialog ver reserva */}
        <Dialog
          fullWidth
          maxWidth="md"
          open={this.state.openView}
          onClose={this.handleViewDialog}
          title="Ver reserva"
          dialogActions={
            <>
              <Button variant="contained" onClick={() => {}}>
                Editar
              </Button>
              <Button variant="contained" onClick={() => {}}>
                Borrar
              </Button>
            </>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Nombre reserva</Typography>
              <Typography variant="body2">
                {this.state.eventSelected ? this.state.eventSelected.title : ""}
              </Typography>
              <Typography variant="body1">Hora entrada reserva</Typography>
              <Typography variant="body2">
                {moment(
                  this.state.eventSelected ? this.state.eventSelected.date : ""
                )
                  .add(-2, "h")
                  .format("HH:mm")}
              </Typography>
              <Typography variant="body1">Hora salida reserva</Typography>
              <Typography variant="body2">
                {this.state.eventSelected
                  ? moment(this.state.eventSelected.date).format("HH:mm")
                  : ""}
              </Typography>
              <Typography variant="body1">Número de personas</Typography>
              <Typography variant="body2">
                {this.state.eventSelected
                  ? this.state.eventSelected.people
                  : ""}
              </Typography>
              <Typography variant="body1">Comentarios</Typography>
              <Typography variant="body2">
                {this.state.eventSelected
                  ? this.state.eventSelected.comments
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Dialog>
        <Calendar
          date={moment()}
          selectable
          onSelectEvent={(event) => {
            this.setState({ eventSelected: event }, () =>
              this.handleViewDialog()
            );
          }}
          onSelectSlot={this.handleSelect}
          events={this.state.events}
        />
      </div>
    );
  }
}

export { CalendarPage };
