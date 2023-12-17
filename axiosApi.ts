import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://auth-user-api.vercel.app/api",
  //   baseURL: "http://localhost:8000/api/",
});

export default axiosApi;
