import axios from "axios";

// const API_URL = "http://localhost:8080/api/home/";
const API_URL = "https://web-project-service.onrender.com/api/home/";

class HomeService {
  home() {
    return axios.get(API_URL);
  }

  getOnePost(_id) {
    return axios.get(API_URL + _id);
  }

  getUserData(_id) {
    return axios.get(API_URL + "userData/" + _id);
  }
}
const homeService = new HomeService();
export default homeService;
