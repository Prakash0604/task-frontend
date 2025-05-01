"use client";

import { useEffect, useState, useCallback } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import ProjectDetailsModal from "./projectDetailsModal";
import EditProjectModal from "./edit-project-modal";
import useProjectsStore from "@/store/projects-store/get-projects-stores";

interface Project {
  id: number;
  name: string;
  assignedPersons: string[];
  createDate: string;
  completionDate: string | null;
  description: string;
}

export default function ProjectsTable() {
  const { fetchProjects, deleteProject } = useProjectsStore();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // Reusable function to load and transform data
  const loadProjects = useCallback(async () => {
    const response = await fetchProjects();
    if (response.success) {
      const transformed: Project[] = response.data.map((item) => ({
        id: item.id,
        name: item.title,
        assignedPersons: ["N/A"],
        createDate: item.created_at,
        completionDate: null,
        description: item.description,
      }));
      setProjects(transformed);
    }
  }, [fetchProjects]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects.find((p) => p.id === id);
    if (project) {
      setProjectToEdit(project);
      setEditModalOpen(true);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const success = await deleteProject(id);
    if (success) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } else {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">Projects Management</h1>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border rounded-lg">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead className="w-16 border-r">S.N</TableHead>
                  <TableHead className="border-r">Project Name</TableHead>
                  <TableHead className="border-r">Assigned Persons</TableHead>
                  <TableHead className="border-r">Create Date</TableHead>
                  <TableHead className="border-r">Completion Date</TableHead>
                  <TableHead className="border-r">Description</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow
                    key={project.id}
                    className="border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => handleRowClick(project)}
                  >
                    <TableCell className="font-medium border-r">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-r">{project.name}</TableCell>
                    <TableCell className="border-r">
                      <div className="flex flex-col gap-1">
                        {project.assignedPersons.map((person, idx) => (
                          <span key={idx} className="text-sm">
                            • {person}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="border-r">
                      {new Date(project.createDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border-r">
                      {project.completionDate
                        ? new Date(project.completionDate).toLocaleDateString()
                        : "In Progress"}
                    </TableCell>
                    <TableCell className="max-w-xs truncate border-r">
                      {project.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleEdit(project.id, e)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDelete(project.id, e)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditProjectModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={projectToEdit}
        onUpdateSuccess={() => {
          setEditModalOpen(false);
          loadProjects(); // Refetch updated project list
        }}
      />
    </div>
  );
}
