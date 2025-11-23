"use client";

import { useState } from "react";
import { usePostsQuery } from "@/app/hooks/allBlog";
import { Edit, Trash, Check, X } from "lucide-react";
import api from "@/app/lib/axiosInstance";

export default function AllBlogs() {
  const { data, isLoading, isError, refetch } = usePostsQuery();
  const posts = data || [];

  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditContent("");
  };

  const handleSaveEdit = async (postId) => {
    try {
      await api.patch(`/social-media/posts/${postId}`, {
        content: editContent,
      });
      setEditingPostId(null);
      setEditContent("");
      refetch();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/social-media/posts/${postId}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Content</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id} className="bg-white dark:bg-gray-800">
              <td className="border px-4 py-2">{index + 1}</td>

              {/* Editable content */}
              <td className="border px-4 py-2">
                {editingPostId === post._id ? (
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  post.content
                )}
              </td>

              <td className="border px-4 py-2">
                {post.author.firstName} {post.author.lastName}
              </td>

              <td className="border px-4 py-2">
                {new Date(post.createdAt).toLocaleString()}
              </td>

              <td className="border px-4 py-2 flex gap-2">
                {editingPostId === post._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(post._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(post)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
