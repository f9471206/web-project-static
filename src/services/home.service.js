import axios from "axios";

const API_URL = "https://web-project-service.onrender.com/api/home/";

class HomeService {
  home() {
    return axios.get(API_URL);
  }

  getOnePost(_id) {
    return axios.get(API_URL + _id);
  }
}
const homeService = new HomeService();
export default homeService;
