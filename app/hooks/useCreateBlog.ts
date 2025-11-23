import { useMutation } from "@tanstack/react-query";
import { useBlogStore } from "../store/blogStore";

export function useCreateBlog() {
  const createBlog = useBlogStore((state) => state.createBlog);

  return useMutation({
    mutationFn: (formData: FormData) => createBlog(formData),
  });
}
