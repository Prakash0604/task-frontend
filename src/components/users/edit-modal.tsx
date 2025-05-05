import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useUsersStore from "@/store/user-store/get-user-store";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { updateUserAPI } from "@/store/user-store/update-user";
import { AxiosError } from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  profile: string | null;
  contact: string;
  address: string;
  created_at: string;
  updated_at: string;
  is_verified: string;
  office_status: string | null;
  status: string;
}

interface EditUserForm {
  name: string;
  email: string;
  contact: string;
  address: string;
}

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const { fetchUsers } = useUsersStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserForm>({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
    },
  });

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: EditUserForm) => {
    if (!user) return;

    try {
      const success = await updateUserAPI(user.id, {
        name: data.name,
        email: data.email,
        contact: data.contact,
        address: data.address,
      });

      if (success) {
        toast.success("User updated successfully");
        await fetchUsers();
        onClose();
      } else {
        toast.error("Failed to update user: Unexpected response");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;
      console.error("Update error:", {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
      });

      if (axiosError.response) {
        const { status, data } = axiosError.response;
        if (status === 422 && data.errors) {
          const errorMessages = Object.entries(data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");
          toast.error(`Validation failed: ${errorMessages}`);
        } else if (status === 401) {
          toast.error("Unauthorized: Invalid or missing token");
        } else if (status === 404) {
          toast.error("User not found");
        } else {
          toast.error(
            data.message || "An error occurred while updating the user"
          );
        }
      } else {
        toast.error("Network error: Unable to reach the server");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[var(--taskmandu-background)] dark:bg-gray-900 border border-gray-400/80 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-gray-200">
            Edit User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-300"
              >
                Name
              </Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 255,
                    message: "Name cannot exceed 255 characters",
                  },
                })}
                className="border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                  maxLength: {
                    value: 255,
                    message: "Email cannot exceed 255 characters",
                  },
                })}
                className="border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="contact"
                className="text-gray-700 dark:text-gray-300"
              >
                Contact
              </Label>
              <Input
                id="contact"
                {...register("contact", {
                  required: "Contact is required",
                  minLength: {
                    value: 10,
                    message: "Contact must be at least 10 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Contact cannot exceed 50 characters",
                  },
                })}
                className="border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="address"
                className="text-gray-700 dark:text-gray-300"
              >
                Address
              </Label>
              <Input
                id="address"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                  maxLength: {
                    value: 255,
                    message: "Address cannot exceed 255 characters",
                  },
                })}
                className="border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--taskmandu-primary)] text-white hover:bg-[var(--taskmandu-primary-dark)]"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
