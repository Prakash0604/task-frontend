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

interface UpdateClientResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: Client | null;
}

interface UpdateClientState {
  isLoading: boolean;
  error: string | null;
  updateClient: (id: number, updatedClient: Partial<Client>) => Promise<UpdateClientResponse>;
}

const useUpdateClientStore = create<UpdateClientState>()(
  immer((set) => ({
    isLoading: false,
    error: null,
    updateClient: async (id: number, updatedClient: Partial<Client>): Promise<UpdateClientResponse> => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const token = getUser();
        if (!token) {
          throw new Error('No token found');
        }

        const res = await API.put<UpdateClientResponse>(`/clients/${id}`, updatedClient, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = res.data;

        if (responseData.success) {
          set((state) => {
            state.isLoading = false;
          });
          return responseData;
        } else {
          set((state) => {
            state.error = responseData.message || 'Failed to update client';
            state.isLoading = false;
          });
          return responseData;
        }
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
          data: null,
        };
      }
    },
  }))
);

export default useUpdateClientStore;