import axios from "axios";
import { BASE_URL } from "constants/index";

// Design Queries and Mutations Start

export const GET_USERS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/users`, {
    params: e.queryKey[1]
  });
  return res.data;
};

export const GET_USER_DETAILS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/users/${e.queryKey[1].id}`);
  return res.data;
};

