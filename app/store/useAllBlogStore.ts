import { create } from "zustand";
import api from "../lib/axiosInstance";

export const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  fetchPosts: async () => {
    try {
      const res = await api.get("/social-media/posts?page=1&limit=10");
      if (res.data.success) {
        set({ posts: res.data.data.posts }); 
        return res.data.data.posts; 
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  },
}));

export const updatePostApi = async (postId, content) => {
  const res = await api.patch(`/social-media/posts/${postId}`, { content });
  return res.data;
};

export const deletePostApi = async (postId) => {
  const res = await api.delete(`/social-media/posts/${postId}`);
  return res.data;
};
