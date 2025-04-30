"use client";

import DefaultLayout from "@/components/default-layout";
import ProjectsTable from "@/components/tables/project-tables";
import ProtectedRoute from "@/components/user-auth/protected-route";
import React from "react";
import { CardContent } from "@/components/ui/card";
import Container from "@/components/containers/main-container";
const Projects: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Container className="p-4 bg-gray-50 dark:bg-gray-900 dark:text-white">
          <Container className="">
            <Container>
              <h1 className="text-3xl font-bold tracking-tight">
                Project Dashboard
              </h1>
              <p className="text-gray-500 mt-1 dark:text-white mb-2">
                Manage and track all your projects in one place.
              </p>
            </Container>

            {/* <Card> */}
            <CardContent>
              <ProjectsTable />
            </CardContent>
            {/* </Card> */}
          </Container>
        </Container>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Projects;
