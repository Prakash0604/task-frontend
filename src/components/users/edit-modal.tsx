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
import Image from "next/image";

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
  password?: string;
  confirmPassword?: string;
  profile?: FileList;
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
    watch,
    reset,
  } = useForm<EditUserForm>({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
    },
  });

  const watchProfile = watch("profile");
  const [preview, setPreview] = React.useState<string | null>(null);

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

  React.useEffect(() => {
    if (watchProfile && watchProfile.length > 0) {
      const file = watchProfile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [watchProfile]);

  const onSubmit = async (data: EditUserForm) => {
    if (!user) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("address", data.address);

      if (data.password) formData.append("password", data.password);
      if (data.profile?.[0]) formData.append("profile", data.profile[0]);

      const success = await updateUserAPI(user.id, formData);

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
      console.error("Update error:", axiosError);

      if (axiosError.response) {
        const { status, data } = axiosError.response;
        if (status === 422 && data.errors) {
          const errorMessages = Object.entries(data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");
          toast.error(`Validation failed: ${errorMessages}`);
        } else if (status === 401) {
          toast.error("Unauthorized: Invalid or missing token");
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
      <DialogContent className="sm:max-w-[500px] bg-[var(--taskmandu-background)] dark:bg-gray-900 border border-gray-400/80 dark:border-gray-700 ">
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-gray-200">
            Edit User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 dark:bg-gray-900 dark:border-gray-700 ">
            {/* Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Name
              </Label>
              <Input
                id="name"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 255, message: "Max 255 characters" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700 dark:bg-gray-800"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                  maxLength: { value: 255, message: "Max 255 characters" },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <Label
                htmlFor="contact"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Contact
              </Label>
              <Input
                id="contact"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700"
                {...register("contact", {
                  required: "Contact is required",
                  minLength: { value: 10, message: "At least 10 characters" },
                  maxLength: { value: 50, message: "Max 50 characters" },
                })}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label
                htmlFor="address"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Address
              </Label>
              <Input
                id="address"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700"
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 5, message: "At least 5 characters" },
                  maxLength: { value: 255, message: "Max 255 characters" },
                })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Profile Image - full width */}
            <div className="col-span-1 md:col-span-2">
              <Label
                htmlFor="profile"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Profile Image
              </Label>
              <Input
                id="profile"
                type="file"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700"
                accept="image/*"
                {...register("profile")}
              />
              {preview && (
                <Image
                  width={200}
                  height={200}
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 rounded-full object-cover mt-2"
                />
              )}
            </div>

            {/* Password - full width */}
            <div className="col-span-1 md:col-span-2">
              <Label
                htmlFor="password"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700"
                {...register("password", {
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password - full width */}
            <div className="col-span-1 md:col-span-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-800 dark:text-gray-200 mb-2"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="dark:text-white dark:shadow-md dark:shadow-blue-700"
                {...register("confirmPassword", {
                  validate: (value) =>
                    !watch("password") ||
                    value === watch("password") ||
                    "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-gray-800 dark:text-gray-200 border-gray-400/80 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:shadow-md dark:shadow-blue-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--taskmandu-primary)] text-white ] dark:shadow-lg dark:shadow-blue-700"
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
