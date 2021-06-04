import axios from "axios";
import { BASE_URL } from "constants/index";

// Design Queries and Mutations Start
export const GET_WAITERS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/restaurant-waiters`, {
    params: e.queryKey[1],
  });
  return res.data;
};

export const GET_WAITER_REVIEWS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/waiters-voting`, {
    params: e.queryKey[1],
  });
  return res.data;
};

export const DELETE_WAITER_REVIEW = async (e) => {
  const res = await axios.delete(BASE_URL + `/v1/waiters-voting/${e.id}`);
  return res.data;
};

export const GET_ALL_WAITERS_REVIEWS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/waiters-voting`, {
    params: e.queryKey[1],
  });
  return res.data;
};

export const UPDATE_WAITER = async (e) => {
  const res = await axios.patch(BASE_URL + `/v1/restaurant-waiters/${e.id}`, e);
  return res.data;
};

export const DELETE_WAITER = async (e) => {
  const { id, ...rest } = e;
  const res = await axios.delete(BASE_URL + `/v1/restaurant-waiters/${e.id}`, {
    data: {
      ...rest,
    },
  });
  return res.data;
};

export const DELETE_MULTIPLE_WAITER = async (e) => {
  const res = await axios.post(BASE_URL + `/v1/restaurant-waiters/bulk-delete`, e);
  return res.data;
};
