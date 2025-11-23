"use client";

import { useState } from "react";
import AddBlog from "../blog/addBlog";
import AllBlogs from "../blog/allBlog";

const sidebarItems = [
  { id: "add", label: "Add Blog" },
  { id: "all", label: "All Blogs" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("add"); // default tab: Add Blog

  const renderContent = () => {
    switch (activeTab) {
      case "add":
        return <AddBlog />;
      case "all":
        return <AllBlogs />;
      default:
        return <AddBlog />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Dashboard
        </h2>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  activeTab === item.id
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
