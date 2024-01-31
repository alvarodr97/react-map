import axios from "axios";

const URL = "https://api.mapbox.com";

export const searchApi = axios.create({
  baseURL: `${URL}`,
  params: {
    language: "es",
    access_token: import.meta.env.VITE_API_KEY,
  },
});
