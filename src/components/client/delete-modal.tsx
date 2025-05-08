"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDeleteClientStore from "@/store/clients-store/delete-client";

export type Client = {
  id: number;
  name: string;
  email: string;
  address: string;
  contact: string;
  contact_person: string;
  contact_number_person: string;
  project_id: { [key: string]: number };
  created_at: string;
};

interface DeleteClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteClientModal({
  client,
  isOpen,
  onClose,
  onConfirm,
}: DeleteClientModalProps) {
  const { isLoading, error } = useDeleteClientStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Delete Client
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete {client?.name || "this client"}?
            This action cannot be undone.
          </DialogDescription>
          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
