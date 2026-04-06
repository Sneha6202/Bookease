import axios from "axios";

const api = axios.create({
  baseURL: "https://bookease-86mf.onrender.com/api",
});

export default api;
