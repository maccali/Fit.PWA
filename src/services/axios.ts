import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "nextauth.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.API_URL,
  });

  api.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  if (token) {
    api.defaults.headers["token"] = `${token}`;
  }

  return api;
}
