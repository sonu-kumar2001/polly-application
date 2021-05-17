import axios from "axios";

const create = payload => axios.post("/votes/", payload);

const voteApi = {
  create,
};

export default voteApi;
