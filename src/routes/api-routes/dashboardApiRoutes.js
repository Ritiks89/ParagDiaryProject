import { tokenPayload } from "@/utils/constantFunction";
import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL;

// Read token and user profile
const token = localStorage?.getItem("authToken");
const storedProfile = localStorage?.getItem("userProfile");
const userProfile = storedProfile ? JSON.parse(storedProfile) : null;

// Decode token payload
const payload = token ? tokenPayload(token) : null;
const user_id = payload?.sub;

const API = axios.create({
  baseURL: `${apiurl}/api/`,
});

// Request interceptor
API.interceptors.request.use((req) => {
  const token = localStorage?.getItem("authToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  req.headers["Content-Type"] = "application/json";
  return req;
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // localStorage.clear();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getLoggedInUser = () =>
  API.post(`getusereditdetails`, { user_id });

//Product
export const addProductsApi = (payload) => API.post(`products`, { ...payload });
export const getProductsApi = () => API.get(`products`);
export const getProductById = (id) => API.get(`products/${id}`);
export const getUpdateProductById = (payload) =>
  API.put(`products/${payload.id}`, payload);

//distribtor add
export const addDistributorApi = (payload) =>
  API.post(`auth/signup`, { ...payload });
export const getDistributorApi = () => API.get(`auth/users`);
export const getUpdateDistributorById = (payload) =>
  API.put(`distributors/${payload.id}`, payload);
export const getDistributorById = (id) => API.get(`products/${id}`);
