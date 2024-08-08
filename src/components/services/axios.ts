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
    axios.put(`/product/`, payload, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const deleteProduct = async (payload: any) => {
  return await ServiceHandler(
    axios.delete(`/product/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: { id: payload.id },
    })
  );
};
export const placeOrders = async (payload: any) => {
  return await ServiceHandler(
    axios.post(`/add-order/`, payload, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const getOrderHistory = async (payload: any) => {
  return await ServiceHandler(
    axios.get(`/add-order/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const getOrdersById = async (payload: any) => {
  return await ServiceHandler(
    axios.get(`/add-order/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const getAdminOrders = async (payload: any) => {
  return await ServiceHandler(
    axios.get(`/orders/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const updateAdminOrders = async (payload: any) => {
  return await ServiceHandler(
    axios.put(`/orders/`, payload, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const deleteAdminOrders = async (payload: any) => {
  return await ServiceHandler(
    axios.delete(`/orders/`, {
      params: payload,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const contactMail = async (payload: any) => {
  return await ServiceHandler(
    axios.post(`/contact-form/`, payload, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
  );
};
export const getUserdetails = async (payload: any) => {
  return await ServiceHandler(
    axios.get(`/user-details/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
