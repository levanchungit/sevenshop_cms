import axios from "axios";
import {
  IAuthTokens,
  TokenRefreshRequest,
  getBrowserLocalStorage,
  applyAuthTokenInterceptor,
} from "axios-jwt";

const BASE_URL = "https://sevenshop.herokuapp.com";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  const response = await axios.post(`${BASE_URL}/user/refresh_token`, {
    token: refreshToken,
  });

  return response.data.access_token;
};

// applyAuthTokenInterceptor(axiosInstance, {
//   requestRefresh,
//   header: "Authorization", // header name
//   headerPrefix: "Bearer ", // header value prefix
// });

export const login = async (email: string, password: string) => {
  try {
    const data = { email, password };
    const response = await axiosInstance.post("/user/login", data);
    console.log("axios response", response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
