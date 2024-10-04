import axios from "axios";
const axiosClient = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV,
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const jwt = getCookie("__session");
    //////console.log(jwt)
    config.headers.setAuthorization(`Bearer ${jwt}`);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export { axiosClient };
