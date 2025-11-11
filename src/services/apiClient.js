// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: { Authorization: process.env.REACT_APP_ACCESS_TOKEN },
  params: { api_key: process.env.REACT_APP_API_KEY },
});

export default apiClient;
