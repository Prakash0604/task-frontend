"use client";

import { useState } from "react";
import DefaultLayout from "@/components/default-layout";
import ProtectedRoute from "@/components/user-auth/protected-route";
import { Button } from "@/components/ui/button";
import Container from "@/components/containers/main-container";
import AddProjectModal from "@/components/tables/add-project";
import { ProjectsDataTable } from "@/components/tables/project-tables";


const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Container className="p-4  dark:text-white">
          <Container className="">
            <Container className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Project Dashboard
                </h1>
                <p className="text-gray-500 mt-1 dark:text-white mb-2">
                  Manage and track all your projects in one place.
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="ml-auto mr-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
              >
                Add Project
              </Button>
            </Container>
            <ProjectsDataTable />
          </Container>
        </Container>
        <AddProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Projects;
