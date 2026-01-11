import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://real-time-chat1-8hhq.onrender.com/api" : "/api",
  withCredentials: true,
});