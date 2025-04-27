"use client";

import DefaultLayout from "@/Components/default-layout";
import ProtectedRoute from "@/Components/user-auth/protected-route";
import React from "react";
const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <h1>skdkdlasklfdksajkl</h1>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
