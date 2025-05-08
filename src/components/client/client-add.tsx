import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCreateClientStore } from "@/store/clients-store/add-client";
import useProjectsStore from "@/store/projects-store/get-projects-stores";
import { toast } from "sonner";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

const clientSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address is too long"),
  contact: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
  contact_person: z
    .string()
    .min(1, "Contact person is required")
    .max(100, "Contact person name is too long"),
  contact_number_person: z
    .string()
    .min(1, "Contact person number is required")
    .regex(/^\d{10}$/, "Contact person number must be 10 digits"),
  project_id: z
    .array(z.number())
    .min(1, "At least one project must be selected"),
});

type ClientFormData = z.infer<typeof clientSchema>;

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onAddSuccess,
}) => {
  const { createClient, loading } = useCreateClientStore();
  const {
    projects,
    isLoading: projectsLoading,
    error: projectsError,
    fetchProjects,
  } = useProjectsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      contact: "",
      contact_person: "",
      contact_number_person: "",
      project_id: [],
    },
  });

  const project_id = watch("project_id");

  // Fetch projects when the modal opens
  useEffect(() => {
    if (isOpen && !projects && !projectsLoading && !projectsError) {
      fetchProjects().catch(() => {
        toast.error("Failed to fetch projects. Please try again.");
      });
    }
  }, [isOpen, projects, projectsLoading, projectsError, fetchProjects]);

  const handleProjectToggle = (id: number) => {
    setValue(
      "project_id",
      project_id.includes(id)
        ? project_id.filter((pid) => pid !== id)
        : [...project_id, id],
      { shouldValidate: true }
    );
  };

  const onFormSubmit = async (data: ClientFormData) => {
    try {
      await createClient(data);
      reset();
      onAddSuccess();
      onClose();
    } catch {
      toast.error("Failed to add client. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 transition-all duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Add New Client
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="flex flex-col gap-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter client name"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter client email"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter client address"
                  disabled={loading}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  Contact
                </Label>
                <Input
                  id="contact"
                  {...register("contact")}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter contact number"
                  disabled={loading}
                />
                {errors.contact && (
                  <p className="text-sm text-red-500">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="contact_person"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  Contact Person
                </Label>
                <Input
                  id="contact_person"
                  {...register("contact_person")}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter contact person name"
                  disabled={loading}
                />
                {errors.contact_person && (
                  <p className="text-sm text-red-500">
                    {errors.contact_person.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact_number_person"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  Contact Person Number
                </Label>
                <Input
                  id="contact_number_person"
                  {...register("contact_number_person")}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter contact person number"
                  disabled={loading}
                />
                {errors.contact_number_person && (
                  <p className="text-sm text-red-500">
                    {errors.contact_number_person.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="projects"
                className="font-medium text-gray-700 dark:text-gray-200"
              >
                Projects
              </Label>
              {projectsLoading && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading projects...
                </p>
              )}
              {projectsError && (
                <p className="text-sm text-red-500">{projectsError}</p>
              )}
              {!projectsLoading &&
                !projectsError &&
                (!projects || projects.length === 0) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No projects available
                  </p>
                )}
              {projects && projects.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                      disabled={loading || projectsLoading}
                    >
                      {project_id.length === 0
                        ? "Select projects"
                        : project_id
                            .map(
                              (id) =>
                                projects.find((p) => p.id === id)?.title ||
                                id.toString()
                            )
                            .join(", ")}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center space-x-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <Checkbox
                          id={`project-${project.id}`}
                          checked={project_id.includes(project.id)}
                          onCheckedChange={() =>
                            handleProjectToggle(project.id)
                          }
                          disabled={loading || projectsLoading}
                        />
                        <label
                          htmlFor={`project-${project.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {project.title}
                        </label>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              )}
              {errors.project_id && (
                <p className="text-sm text-red-500">
                  {errors.project_id.message}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selected projects:{" "}
                {project_id.length === 0
                  ? "None"
                  : project_id
                      .map(
                        (id) =>
                          projects?.find((p) => p.id === id)?.title ||
                          id.toString()
                      )
                      .join(", ")}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              disabled={loading || projectsLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-200"
              disabled={loading || projectsLoading}
            >
              {loading ? "Adding..." : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
