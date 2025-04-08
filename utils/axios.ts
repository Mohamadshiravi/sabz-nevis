import axios from "axios";
import { SendErrorToast } from "./toast-functions";

const axiosInatnce = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "aplication/json",
  },
});

export default axiosInatnce;
