import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';
import API from '@/config/request';

interface User {
  id: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  deleteUser: (id: string) => Promise<User | null>;
}

export const useDeleteUserStore = create<UserState>()(
  immer((set) => ({
    users: [],
    loading: false,
    error: null,
    successMessage: null,

    deleteUser: async (id: string) => {
      set((state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      });

      try {
        const token = getUser();
        if (!token) {
          throw new Error('No token found');
        }
        console.log("Deleting user with ID:", id, "Token:", token);
        const response = await API.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Delete response:", response);
        if (response.status >= 200 && response.status < 300) {
          set((state) => {
            state.users = state.users.filter((user) => user.id !== id);
            state.successMessage = 'User deleted successfully.';
            state.loading = false;
          });
          return response.data || null;
        } else {
          throw new Error('Failed to delete user: Unexpected response');
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
          axiosError.response?.data?.message || 'Something went wrong';
        set((state) => {
          state.error = errorMessage;
          state.loading = false;
        });

        throw new Error("Delete API error: " + JSON.stringify({
          message: errorMessage,
          status: axiosError.response?.status,
          response: axiosError.response?.data,
        }));
      }
    },
  }))
);