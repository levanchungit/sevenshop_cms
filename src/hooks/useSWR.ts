import useSWR from "swr";
import * as api from "../services/api";

export const useFetch = () => {
  return {
    Login: (email: string, password: string) =>
      useSWR("/user/login", async () => {
        const response = await api.login(email, password);
        console.log("SWR response", response);
        return response;
      }),
  };
};
