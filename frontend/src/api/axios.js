import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookease-86mf.onrender.com/",
});

export default instance;
