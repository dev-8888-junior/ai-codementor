import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";
console.log(API_URL) ;
const API = axios.create({
  baseURL: API_URL,
});

export default API;