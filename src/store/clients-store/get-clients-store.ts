import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';

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

interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

interface ClientsResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: Client[];
  meta: Meta;
}

interface ClientsState {
  clients: Client[] | null;
  meta: Meta | null;
  isLoading: boolean;
  error: string | null;
  fetchClients: () => Promise<ClientsResponse>;
}

const useClientsStore = create<ClientsState>()(
  immer((set) => ({
    clients: null,
    meta: null,
    isLoading: false,
    error: null,
    fetchClients: async (): Promise<ClientsResponse> => {
      // Skip fetch if already loading
      if (useClientsStore.getState().isLoading) {
        return {
          success: false,
          message: 'Fetch already in progress',
          status_code: 429,
          data: [],
          meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            next_page_url: null,
            prev_page_url: null,
            from: 0,
            to: 0,
            path: '',
          },
        };
      }

      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const token = getUser();
        if (!token) {
          throw new Error('No token found');
        }

        const res = await API.get<ClientsResponse>('/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = res.data;

        // Normalize project_id to ensure it's an object
        const normalizedData = responseData.data.map((client) => ({
          ...client,
          project_id: Array.isArray(client.project_id)
            ? client.project_id.reduce((acc, id, index) => {
                acc[index.toString()] = id;
                return acc;
              }, {} as { [key: string]: number })
            : client.project_id || {},
        }));

        if (responseData.success) {
          set((state) => {
            state.clients = normalizedData;
            state.meta = responseData.meta || {
              current_page: 1,
              last_page: 1,
              per_page: 10,
              total: normalizedData.length,
              next_page_url: null,
              prev_page_url: null,
              from: 1,
              to: normalizedData.length,
              path: '',
            };
            state.isLoading = false;
          });
        } else {
          set((state) => {
            state.error = responseData.message || 'Failed to fetch clients';
            state.isLoading = false;
          });
        }

        return { ...responseData, data: normalizedData };
      } catch (error) {
        const errorMessage =
          (error as AxiosError<{ message?: string }>).response?.data?.message ||
          'Something went wrong';

        set((state) => {
          state.error = errorMessage;
          state.isLoading = false;
        });

        return {
          success: false,
          message: errorMessage,
          status_code: 500,
          data: [],
          meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            next_page_url: null,
            prev_page_url: null,
            from: 0,
            to: 0,
            path: '',
          },
        };
      }
    },
  }))
);

export default useClientsStore;