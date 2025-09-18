import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_CMS_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;
