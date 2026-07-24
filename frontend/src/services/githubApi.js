import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/github",
});

export default api;