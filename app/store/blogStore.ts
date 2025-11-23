import { create } from "zustand";
import api from "../lib/axiosInstance";

interface BlogState {
  createBlog: (data: FormData) => Promise<any>;
}

export const useBlogStore = create<BlogState>((set) => ({
  createBlog: async (data: FormData) => {
    try {
      const res = await api.post("/social-media/posts", data);
      return res.data;
    } catch (error: any) {
      console.error("Create blog error:", error);
      throw error;
    }
  },
}));
