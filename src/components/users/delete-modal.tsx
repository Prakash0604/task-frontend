import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserStore } from "@/store/user-store/delete-user-store";
import { toast } from "sonner";

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

interface DeleteUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onDeleteSuccess,
}) => {
  const { deleteUser, loading, error } = useDeleteUserStore();

  const handleDelete = async () => {
    if (!user) {
      toast.error("No user selected for deletion");
      return;
    }

    try {
      console.log("Attempting to delete user with ID:", user.id);
      await deleteUser(user.id.toString());
      console.log("User deleted successfully");
      onDeleteSuccess();
      onClose();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(error || "Failed to delete user");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[var(--taskmandu-background)] dark:bg-gray-900 border border-gray-400/80 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-gray-200">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete the user{" "}
            <span className="font-semibold">{user?.name}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
