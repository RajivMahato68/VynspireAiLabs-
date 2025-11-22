import { useMutation } from "@tanstack/react-query";
import api from "../lib/axiosInstance";
import { useAuthStore } from "../store/useAuthStore";

interface LoginData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await api.post("/users/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      const token = data.data.accessToken;
      const user = data.data.user;
      if (token) {
        setToken(token, user); 
      }
    },
  });
};
