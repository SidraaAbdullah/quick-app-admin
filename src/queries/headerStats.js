import axios from "axios";
import { BASE_URL } from "constants/index";

// Design Queries and Mutations Start

export const GET_HEADER_STATS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/dashboard`);
  return res.data;
};
