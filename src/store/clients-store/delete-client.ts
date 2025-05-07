"use client";

import API from "@/config/request";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AxiosError } from "axios";
import { getUser } from "@/utlis";

interface Client {
  id: number;
  name: string;
  email: string;
  address: string;
  contact: string;
  contact_person: string;
  contact_number_person: string;
  project_id: { [key: string]: number };
  created_at: string;
}

interface DeleteClientState {
  clients: Client[];
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  deleteClient: (
    id: number
  ) => Promise<{ success: boolean; message?: string }>;
}

const useDeleteClientStore = create<DeleteClientState>()(
  immer((set) => ({
    clients: [],
    loading: false,
    isLoading: false,
    error: null,
    successMessage: null,
    deleteClient: async (id: number) => {
      set((state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      });

      try {
        const token = getUser();
        console.log("Deleting client with ID:", id, "Token:", token);
        if (!token) {
          throw new Error("No token found");
        }

        const response = await API.delete(`/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Delete response:", response);

        if (response.status >= 200 && response.status < 300) {
          set((state) => {
            state.clients = state.clients.filter((client) => client.id !== id);
            state.successMessage = "Client deleted successfully.";
            state.loading = false;
          });
          return {
            success: true,
            message: "Client deleted successfully.",
          };
        } else {
          throw new Error("Failed to delete client: Unexpected response");
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "Something went wrong";
        set((state) => {
          state.error = errorMessage;
          state.loading = false;
        });

        return {
          success: false,
          message: errorMessage,
        };
      }
    },
  }))
);

export default useDeleteClientStore;