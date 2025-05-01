"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import useProjectsStore from "@/store/projects-store/get-projects-stores";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
    description: string;
  } | null;
  onUpdateSuccess: () => void;
}

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
  onUpdateSuccess,
}: Props) {
  const { updateProject } = useProjectsStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleUpdate = async () => {
    if (!project) return;

    const success = await updateProject(project.id, {
      title: name,
      description,
    });

    if (success) {
      toast.success("Project updated successfully");
      onUpdateSuccess();
      onClose();
    } else {
      toast.error("Failed to update project");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] dark:bg-gray-900 dark:text-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} className="bg-blue-600">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
