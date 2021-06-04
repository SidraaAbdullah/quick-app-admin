import axios from "axios";
import { BASE_URL } from "constants/index";

// Design Queries and Mutations Start

export const GET_WAITERS_CANIDATES = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/waiters-job-form`, {
    params: e.queryKey[1]
  });
  return res.data;
};