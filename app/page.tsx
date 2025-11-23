"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { usePostsQuery } from "./hooks/allBlog";

export default function Home() {
  const { data, isLoading, isError } = usePostsQuery();
  const posts = data || [];

  if (isLoading) return <p className="text-center py-12">Loading posts...</p>;
  if (isError)
    return <p className="text-center py-12">Failed to load posts.</p>;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyBlog</h1>
        <p className="text-xl text-muted-foreground">
          A modern blog built with Next.js, TypeScript, Tailwind & shadcn/ui
        </p>
      </section>

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {post.content.length > 50
                ? post.content.slice(0, 50) + "..."
                : post.content}
            </h3>
            <p className="text-muted-foreground mb-2">
              By {post.author.firstName} {post.author.lastName}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                Tags: {post.tags.join(", ")}
              </p>
            )}

            <p className="text-sm text-gray-400 mb-4">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <Button variant="link" className="mt-2">
              Read more →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
