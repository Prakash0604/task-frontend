"use client";
import LandingPage from "@/components/landing-page";

import PublicRoute from "@/components/user-auth/public-route";
export default function Home() {
  return (
    <>
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    </>
  );
}