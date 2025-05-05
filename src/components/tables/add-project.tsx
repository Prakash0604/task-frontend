"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useProjectsStore from "@/store/projects-store/get-projects-stores";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema using Zod
const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
});

// Define form data type based on schema
type ProjectFormData = z.infer<typeof projectSchema>;

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const addProject = useProjectsStore((state) => state.addProject);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    const success = await addProject({
      title: data.title,
      description: data.description,
    });
    if (success) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-950 dark:text-white focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
                placeholder="Project Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
                placeholder="Project Description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={onClose}
              className="rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
            >
              Add Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
