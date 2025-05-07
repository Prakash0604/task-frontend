"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Client } from "./client-page";
interface ClientDetailsModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

const projectNameMap: { [key: number]: string } = {
  1: "Project Alpha",
  2: "Project Beta",
  3: "Project Gamma",
};

export default function ClientDetailsModal({
  client,
  isOpen,
  onClose,
}: ClientDetailsModalProps) {
  if (!client) return null;

  const projectIds = Object.values(client.project_id) as number[];
  const projectNames =
    projectIds.length > 0
      ? projectIds.map((id) => projectNameMap[id] || "N/A").join(", ")
      : "None";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-200 border border-gray-400/80 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Client Details
          </DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 p-1"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Name:</span>
            <span className="col-span-3">{client.name || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Email:</span>
            <span className="col-span-3 lowercase">
              {client.email || "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Address:</span>
            <span className="col-span-3">{client.address || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Contact:</span>
            <span className="col-span-3">{client.contact || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Contact Person:</span>
            <span className="col-span-3">{client.contact_person || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Person Number:</span>
            <span className="col-span-3">
              {client.contact_number_person || "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Projects:</span>
            <span className="col-span-3">{projectNames}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-medium">Created At:</span>
            <span className="col-span-3">
              {client.created_at
                ? new Date(client.created_at).toISOString().split("T")[0]
                : "N/A"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
