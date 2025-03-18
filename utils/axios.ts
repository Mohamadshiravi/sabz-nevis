import axios from "axios";
import { SendErrorToast } from "./toast-functions";

const axiosInatnce = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "aplication/json",
  },
});

export default axiosInatnce;

axiosInatnce.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        SendErrorToast("برای استفاده از تمام امکانات لطفا وارد اکانت خود شوید");
      } else if (status === 403) {
        SendErrorToast("شما دسترسی ندارید ");
      } else if (status === 500) {
        SendErrorToast("در هنگام دریافت اطلاعات مشکلی پیش امد");
      }
    }
    return Promise.reject(error);
  }
);
