import Axios from "core/axios";

class AuthServices {
  constructor() {
    this.api_url = process.env.REACT_APP_API_URL;
    this.service = new Axios(this.api_url);
  }

  login = (data) => this.service.post("/users/login", data);
}

export default AuthServices;
