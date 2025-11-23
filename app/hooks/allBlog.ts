import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "../store/useAllBlogStore";

export const usePostsQuery = () => {
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts, 
    staleTime: 1000 * 60,
  });
};


