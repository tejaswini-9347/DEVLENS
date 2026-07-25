import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/github",
});

export const getProfile = async (username) => {
  const response = await API.get(`/user/${username}`);
  return response.data;
};

export const getRepositories = async (username) => {
  const response = await API.get(`/repos/${username}`);
  return response.data;
};

export const getFollowers = async (username) => {
  const response = await API.get(`/followers/${username}`);
  return response.data;
};

export const getFollowing = async (username) => {
  const response = await API.get(`/following/${username}`);
  return response.data;
};

export const getAnalytics = async (username) => {
  const response = await API.get(`/analytics/${username}`);
  return response.data;
};
export const getActivityAnalytics = async (username) => {
  const response = await API.get(`/activity/${username}`);
  return response.data;
};