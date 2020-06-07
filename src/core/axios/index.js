import axios from "axios";

class axiosClient {
  constructor(API_SERVICE_URL) {
    this.client = axios.create({
      baseURL: API_SERVICE_URL,
    });
  }

  get = (url) => {
    return this.client.get(url, {});
  };

  post = (url, data) => {
    return this.client.post(url, data, {});
  };

  put = (url, data) => {
    return this.client.put(url, data, {});
  };

  delete = (url) => {
    return this.client.delete(url, {});
  };
}

export default axiosClient;
