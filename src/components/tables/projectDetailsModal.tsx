"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";
// import { Project } from "@/types/project";
import { Project } from "@/lib/type";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Project Details: {project.name}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-white mt-2">
            ID: {project.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Timeline
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(project.createDate).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Completion:</span>{" "}
                {project.completionDate
                  ? new Date(project.completionDate).toLocaleDateString()
                  : "In Progress"}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm">{project.description}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
