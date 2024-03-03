import axios from "axios";
const API_URL = "http://localhost:8080/api/home";

class HomeService {
  home(tag, sort, count = 0) {
    return axios.get(`${API_URL}/${tag}?sort=${sort.sort}&count=${count}`);
  }

  getPost(_id) {
    return axios.get(API_URL + "/tweet/" + _id);
  }

  search(_data) {
    return axios.get(API_URL + "/search/" + _data);
  }
}

const homeService = new HomeService();
export default homeService;
