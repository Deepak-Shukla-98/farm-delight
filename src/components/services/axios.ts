"use client";
import axios from "axios";
import ServiceHandler from "./servicehandler";

export const signUp = async (payload: {}) => {
  return await ServiceHandler(axios.post(`/auth/signup`, payload));
};
export const signIn = async (payload: {}) => {
  return await ServiceHandler(axios.post(`/auth/signin`, payload));
};
export const getProfile = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/routes/profile/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const postProfile = async (payload: { data: {} }) => {
  return await ServiceHandler(
    axios.post(`/routes/profile/`, payload.data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const updateProfile = async (payload: any) => {
  return await ServiceHandler(
    axios.put(`/routes/profile/`, payload.data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: { id: payload.data.id },
    })
  );
};
export const getPosts = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/routes/posts/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const postPosts = async (data: {}) => {
  return await ServiceHandler(
    axios.post(
      `/routes/posts/`,
      {
        title: "new post",
        body: data,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
  );
};
export const updatePosts = async (id: string, post: string) => {
  return await ServiceHandler(
    axios.put(
      `/routes/posts/`,
      { body: post },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        params: { id },
      }
    )
  );
};
export const getComments = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/routes/comments/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const postComments = async (comment: String, id: String) => {
  return await ServiceHandler(
    axios.post(
      `/routes/comments/`,
      { comment },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: { id },
      }
    )
  );
};
export const updateComments = async (payload: { data: {} }) => {
  return await ServiceHandler(
    axios.put(`/routes/comments/`, payload.data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const getFollowings = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/routes/following/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const addFollowers = async (payload: {}) => {
  return await ServiceHandler(
    axios.put(`/routes/following/`, payload, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const getUsers = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/routes/users/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const getFollowers = async (payload: {}) => {
  return await ServiceHandler(
    axios.get(`/routes/followers/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const getUsersById = async (id: string) => {
  return await ServiceHandler(
    axios.get(`/routes/users/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
