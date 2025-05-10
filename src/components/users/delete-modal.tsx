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
import { Loader2 } from "lucide-react";
import useUsersStore from "@/store/user-store/get-user-store";

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
  const { fetchUsers } = useUsersStore()
  const { deleteUser, loading, error } = useDeleteUserStore();

  const handleDelete = async () => {
    if (!user) {
      toast.error("No user selected for deletion");
      return;
    }

    try {
      await deleteUser(user.id.toString());
      await fetchUsers()
      onDeleteSuccess();
      onClose();
    } catch (err) {
      toast.error(error || "We are sorry, there was a problem. Please check the details and try again.");
      throw new Error("We are sorry, there was a problem. Please check the details and try again.", err as Error)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[var(--taskmandu-background)] dark:bg-gray-900 border border-gray-400/80 dark:border-gray-700/80">
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
            className="border bg-[var(--taskmandu-primary-text)] dark:bg-[var(--taskmandu-primary-icon)] border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-900 "
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            className=" text-white "
            disabled={loading}
          >
            {loading ? <Loader2 className="animated-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
