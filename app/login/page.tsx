import LoginPage from "@/components/form/login";
import PublicRoute from "@/components/routeProtection/publicRoute";
import React from "react";

const page = () => {
  return (
    <div>
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    </div>
  );
};

export default page;
