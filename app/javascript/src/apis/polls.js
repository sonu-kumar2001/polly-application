import axios from "axios";

const list = () => axios.get("/polls");

const create = payload => axios.post("/polls/", payload);

const pollApi = {
  list,
  create,
};

export default pollApi;
