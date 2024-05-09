import axios from "axios";

const requestMethod = axios.create({
  baseURL: "http://localhost:1700/api/v1",
  withCredentials: true,
});

export default requestMethod;
