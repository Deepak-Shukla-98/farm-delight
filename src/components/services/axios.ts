"use client";
import axios from "axios";
import ServiceHandler from "./servicehandler";

export const signUp = async (payload: {}) => {
  return await ServiceHandler(axios.post(`/auth/signup`, payload));
};
export const signIn = async (payload: {}) => {
  return await ServiceHandler(axios.post(`/auth/signin`, payload));
};
export const getProducts = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/product/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const postProducts = async (payload: any) => {
  return await ServiceHandler(
    axios.post(`/product/`, payload, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
  );
};
export const updateProducts = async (payload: any) => {
  return await ServiceHandler(
    axios.put(`/product/`, payload.data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: { id: payload.data.id },
    })
  );
};
export const deleteProduct = async (payload: any) => {
  return await ServiceHandler(
    axios.get(`/product/${payload.id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
