import axios from "axios";
import { BASE_URL } from "constants/index";

// Design Queries and Mutations Start

export const GET_RESTAURANTS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/restaurants/save`, {
    params: e.queryKey[1]
  });
  return res.data;
};

export const GET_RESTAURANT_WAITERS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/restaurant-waiters`, {
    params: e.queryKey[1]
  });
  return res.data;
};

export const ADD_MENU_URL_RESTAURANTS = async (e) => {
  const res = await axios.patch(BASE_URL + `/v1/restaurants/${e.id}`, e);
  return res.data;
};


export const SEARCH_RESTAURANTS = async (e) => {
  const res = await axios.get(BASE_URL + `/v1/restaurants/search/${e.queryKey[1].search}`);
  return res.data;
};
