import axios from "axios";

const axiosInatnce = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "aplication/json",
  },
});

export default axiosInatnce;
