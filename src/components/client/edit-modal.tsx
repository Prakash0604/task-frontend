"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateClientStore from "@/store/clients-store/update-client";
import { toast } from "sonner";

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

interface EditClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedClient: Client) => void;
  onUpdateSuccess: () => void; // New prop to trigger fetch
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  client,
  isOpen,
  onClose,
  onSave,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = React.useState<Client | null>(client);
  const { updateClient, isLoading, error } = useUpdateClientStore();

  React.useEffect(() => {
    setFormData(client);
  }, [client]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async () => {
    if (formData) {
      const response = await updateClient(formData.id, {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        contact: formData.contact,
        contact_person: formData.contact_person,
        contact_number_person: formData.contact_number_person,
      });

      if (response.success && response.data) {
        onSave(response.data);
        onUpdateSuccess(); // Trigger fetch in main component
        toast.success("Client updated successfully.");
        onClose();
      } else {
        toast.error(response.message || "Failed to update client.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-950 dark:text-white">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        {error && <div className="text-red-500">{error}</div>}
        {formData && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="address" className="text-right">
                Address
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="contact" className="text-right">
                Contact
              </label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="contact_person" className="text-right">
                Contact Person
              </label>
              <Input
                id="contact_person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="contact_number_person" className="text-right">
                Person Number
              </label>
              <Input
                id="contact_number_person"
                name="contact_number_person"
                value={formData.contact_number_person}
                onChange={handleInputChange}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientModal;
