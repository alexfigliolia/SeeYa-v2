import Axios from 'axios';

class GraphHTTP {

  static client = Axios.create({
    method: 'POST',
    baseURL: 'http://localhost:3001/graphql',
  });

  static init() {
    this.client.interceptors.response.use(
      this.parseResponse,
      this.reject
    );
  }

  static parseResponse(res) {
    return res.data.data;
  }

  static reject(error) {
    Promise.reject(error);
  }
}

GraphHTTP.init();

export default GraphHTTP;