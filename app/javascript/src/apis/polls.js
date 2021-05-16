import axios from "axios";

const list = () => axios.get("/polls");

const create = payload => axios.post("/polls/", payload);

const show = slug => axios.get(`/polls/${slug}`);

const pollApi = {
  list,
  create,
  show,
};

export default pollApi;
