import axios from "axios";

const configuredBaseUrl =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const baseURL = configuredBaseUrl
  .replace(/\/+$/, "")
  .endsWith("/api")
  ? configuredBaseUrl.replace(
      /\/+$/,
      ""
    )
  : `${configuredBaseUrl.replace(
      /\/+$/,
      ""
    )}/api`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !==
        "/login"
    ) {
      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
