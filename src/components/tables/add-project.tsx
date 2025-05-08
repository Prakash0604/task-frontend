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
import { toast } from "sonner";
import { useCreateProjectStore } from "@/store/projects-store/create-project-store";
import { Loader2 } from "lucide-react";

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
  const { fetchProjects } = useProjectsStore()
  const { addNewProject, loading, error } = useCreateProjectStore()

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
    try {
      const newProject = await addNewProject(data.title, data.description);
      if (newProject) {
        toast.success("Project added successfully");
        fetchProjects();
        reset();
        onClose();
      }
      else {
        toast.error(error)
      }
    } catch (error) {
      toast.error("Failed to create the project");
      throw new Error("Failed to create the project", error as Error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 bg-gray-200 dark:text-white focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-xl dark:shadow-blue-400 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-[var(--taskmandu-primary)]">Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-600 dark:text-gray-400">Title</Label>
              <Input
                id="title"
                {...register("title")}
                className={`${errors.title ? "border-red-500" : ""} border border-gray-400/50 dark:border-gray-500 text-gray-600 dark:text-gray-400 focus:ring focus:ring-[var(--taskmandu-primary)]`}
                placeholder="Project Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-600 dark:text-gray-400">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                className={`${errors.title ? "border-red-500" : ""} border border-gray-400/50 dark:border-gray-500 text-gray-600 dark:text-gray-400 focus:ring focus:ring-[var(--taskmandu-primary)]`}
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
              variant="trans"
              onClick={onClose}
              className="rounded-lg border border-[var(--taskmandu-danger)] focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm "
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={onClose}
              className="rounded-lg  text-sm "
            >
              {loading ? <Loader2 /> : "Add Projects"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
