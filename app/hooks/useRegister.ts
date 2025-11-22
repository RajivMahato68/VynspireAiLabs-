import { useMutation } from "@tanstack/react-query";
import api from "../lib/axiosInstance";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string; email: string }) => {
      const res = await api.post("/users/register", data);
      return res.data;
    },
  });
};
