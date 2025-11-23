"use client";
import { useState } from "react";
import { useCreateBlog } from "@/app/hooks/useCreateBlog";

export default function AddBlog() {
  const [content, setContent] = useState("");
  const createBlogMutation = useCreateBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("Content required");

    const formData = new FormData();

    formData.append("content", content.trim());

    formData.append(
      "images",
      new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], "placeholder.png", {
        type: "image/png",
      })
    );

    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        alert("Post created!");
        setContent("");
      },
      onError: (err: any) => {
        console.error(err);
        alert("Still failed — check the key name is exactly 'images'");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <textarea
        className="w-full p-4 border rounded-lg text-lg"
        rows={6}
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={createBlogMutation.isPending}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {createBlogMutation.isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
