import axios from "axios";

const API_URL =
  import.meta.env.VITE_APP_API_URL;

if (!API_URL) {
  console.warn("VITE_APP_API_URL is not set!");
}

const API = axios.create({
  baseURL: API_URL,
});

export default API;