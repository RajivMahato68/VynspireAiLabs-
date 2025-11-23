import ProfilePage from "@/components/profile/profile";
import ProtectedRoute from "@/components/routeProtection/privateRoute";
import React from "react";

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    </div>
  );
};

export default page;
