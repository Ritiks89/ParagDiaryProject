import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL;
const API = axios.create({
  baseURL:"https://parag-dairy-1.onrender.com/api"
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = "Basic dXNlcjpheXVzaA==";
  req.headers["Content-Type"] = "application/json";
  return req;
});

export const loginApi = (payload) => API.post("/auth/signin", payload);
export const signupApi = (payload) => API.post("/auth/signup", payload);

