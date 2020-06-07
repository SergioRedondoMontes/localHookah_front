import Axios from "core/axios";

class BookingServices {
  constructor() {
    this.api_url = process.env.REACT_APP_API_URL;
    this.service = new Axios(this.api_url);
  }

  getBooking = () => this.service.get("/booking");

  postBooking = (data) => this.service.post("/booking", data);

  putBooking = (id, data) => this.service.put(`/booking/${id}`, data);

  deleteBooking = (id) => this.service.delete(`/booking/${id}`);
}

export default BookingServices;
