import axios from "axios";

const list = () => axios.get("/polls");

const pollApi = {
  list,
};

export default pollApi;
