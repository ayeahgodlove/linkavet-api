import axios, { AxiosResponse } from "axios";
import { API_URL } from "config/constant";

// const apiHeaders = {
//   headers: {
//     baseURL: API_URL,
//     Accept: "application/json",
//     Authorization: "",

//   },
// };

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "",
  },
});

const apiConfig = () => {
  var user = JSON.parse(localStorage.getItem("user")!);
  api.defaults.headers["Authorization"] = `Bearer ${user ? user.token : ""}`;
};

const responseBody = (response: AxiosResponse) => response.data;

export const requestType = {
  get: (url: string) => {
    apiConfig(); // Update Authorization header
    return api.get(url).then(responseBody);
  },
  post: (url: string, body: {}) => {
    apiConfig(); // Update Authorization header
    return api.post(url, body).then(responseBody);
  },
  put: (url: string, body: {}) => {
    apiConfig(); // Update Authorization header
    return api.put(url, body).then(responseBody);
  },
  del: (url: string, body: {}) => {
    apiConfig(); // Update Authorization header
    return api.delete(url, { data: body }).then(responseBody);
  },
};

// export const requestType = {
//   get: (url: string) => axios.get(url, apiConfig()).then(responseBody),
//   post: (url: string, body: {}) =>
//     axios.post(url, body, apiConfig()).then(responseBody),
//   put: (url: string, body: {}) =>
//     axios.put(url, body, apiConfig()).then(responseBody),
//   del: (url: string, body: {}) =>
//     axios
//       .delete(apiConfig() + url, {
//         headers: apiConfig().headers,
//         data: body,
//       })
//       .then(responseBody),
// };
