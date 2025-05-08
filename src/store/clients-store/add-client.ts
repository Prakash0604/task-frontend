import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import API from '@/config/request';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';
import { toast } from 'sonner';

interface ClientData {
  name: string;
  email: string;
  address: string;
  contact: string;
  contact_person: string;
  contact_number_person: string;
  project_id: number[];
}

interface ClientResponse {
  name: string;
  email: string;
  address: string;
  contact: string;
  contact_person: string;
  contact_number_person: string;
  project_id: { [key: string]: number };
  id: number;
  created_at: string;
}

interface ClientStore {
  clients: ClientResponse[];
  loading: boolean;
  error: string | null;
  createClient: (data: ClientData) => Promise<ClientResponse | null>;
  addClientToState: (client: ClientResponse) => void;
}

export const useCreateClientStore = create<ClientStore>()(
  immer((set) => ({
    clients: [],
    loading: false,
    error: null,

    createClient: async (data) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const token = getUser();
        if (!token) {
          throw new Error('No token found');
        }

        // Convert project_id array to object format expected by API
        const projectIdObject = data.project_id.reduce((acc, id, index) => {
          acc[index.toString()] = id;
          return acc;
        }, {} as { [key: string]: number });

        const clientData = {
          ...data,
          project_id: projectIdObject,
        };

        const response = await API.post('/clients', clientData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const newClient: ClientResponse = response.data;

        set((state) => {
          state.clients.push(newClient);
          state.loading = false;
        });

        toast.success('Client added successfully');
        return newClient;
      } catch (error) {
        const errorMessage =
          (error as AxiosError<{ message?: string }>).response?.data?.message ||
          'Failed to add client';

        set((state) => {
          state.error = errorMessage;
          state.loading = false;
        });

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },

    addClientToState: (client) => {
      set((state) => {
        state.clients.push(client);
      });
    },
  }))
);