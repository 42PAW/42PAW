import axios from "axios";
import { getCookie, removeCookie } from "@/api/cookie/cookies";
import {
  STATUS_401_UNAUTHORIZED,
  STATUS_403_FORBIDDEN,
} from "@/types/constants/StatusCode";

// axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_HOST,
  withCredentials: true,
});

instance.interceptors.request.use(async (config: any) => {
  const token = getCookie("access_token") ?? null;
  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === STATUS_403_FORBIDDEN) {
      window.location.href = "/sign-up";
    }
    if (error.response?.status === STATUS_401_UNAUTHORIZED) {
      if (import.meta.env.VITE_IS_LOCAL === "true") {
        removeCookie("admin_access_token", {
          path: "/",
          domain: "localhost",
        });
        removeCookie("access_token");
      } else {
        removeCookie("admin_access_token", {
          path: "/",
          domain: "42paw.com",
        });
        removeCookie("access_token", { path: "/", domain: "42paw.com" });
      }
      window.location.href = "/";
      alert(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
