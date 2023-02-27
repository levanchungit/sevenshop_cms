import axios from "axios";
import {
  IAuthTokens,
  TokenRefreshRequest,
  getBrowserLocalStorage,
  applyAuthTokenInterceptor,
} from "axios-jwt";
import { API_URL } from "@/global/config";
import API_ROUTES from "@/global/constants/apiRoutes";

import dynamic from "next/dynamic";

// const ClientComponent = dynamic(() => import("axios-jwt"), {
//   // Do not import in server side
//   ssr: false,
// });

export const axiosInstance = axios.create({ baseURL: API_URL });

const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<string> => {
  const response = await axios.post(`${API_URL}${API_ROUTES.refresh_token}`, {
    access_token: refreshToken,
  });
  console.log(response);

  return response.data.access_token;
};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, {
  requestRefresh,
  header: "Authorization", // header name
  headerPrefix: "Bearer ", // header value prefix
});
