// app/projects/page.tsx
"use client";

import { useState } from "react";
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

// Define type for project data
interface Project {
  id: number;
  name: string;
  assignedPersons: string[];
  createDate: string;
  completionDate: string | null;
  description: string;
}

export default function ProjectsTable() {
  // Sample data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      assignedPersons: ["Jane Smith", "Robert Chen"],
      createDate: "2025-04-15",
      completionDate: "2025-05-30",
      description: "Complete overhaul of company website with modern design",
    },
    {
      id: 2,
      name: "Mobile App Development",
      assignedPersons: ["John Doe", "Emily Wong", "David Miller"],
      createDate: "2025-04-18",
      completionDate: null,
      description:
        "Build a native mobile app for both iOS and Android platforms",
    },
    {
      id: 3,
      name: "Database Migration",
      assignedPersons: ["Sarah Johnson"],
      createDate: "2025-04-22",
      completionDate: "2025-06-15",
      description: "Migrate existing database to new cloud infrastructure",
    },
    {
      id: 4,
      name: "Marketing Campaign",
      assignedPersons: ["Michael Brown", "Jessica Lee"],
      createDate: "2025-04-25",
      completionDate: null,
      description:
        "Develop and execute Q2 marketing campaign across all channels",
    },
    {
      id: 5,
      name: "Marketing",
      assignedPersons: ["Michael Brown", "Jessica Lee"],
      createDate: "2025-04-25",
      completionDate: null,
      description:
        "Develop and execute Q2 marketing campaign across all channels",
    },
  ]);

  // State for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for row click
  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handler for edit action
  const handleEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click handler from firing
    console.log(`Editing project with ID: ${id}`);
    // Implement edit functionality here
  };

  // Handler for delete action
  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click handler from firing
    console.log(`Deleting project with ID: ${id}`);
    setProjects(projects.filter((project) => project.id !== id));
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
                {projects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => handleRowClick(project)}
                  >
                    <TableCell className="font-medium border-r">
                      {project.id}
                    </TableCell>
                    <TableCell className="border-r">{project.name}</TableCell>
                    <TableCell className="border-r">
                      <div className="flex flex-col gap-1">
                        {project.assignedPersons.map((person, index) => (
                          <span key={index} className="text-sm">
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
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDelete(project.id, e)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
