
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
                                const response = await API.delete(`/users/${id}`, {
                                        headers: {
                                                'Content-Type': 'multipart/form-data',
                                                Authorization: `Bearer ${token}`,
                                        },
                                });
                                if (response.status) {
                                        set((state) => {
                                                state.users = state.users.filter((user) => user.id !== id);
                                                state.successMessage = 'User deleted successfully.';
                                        });
                                        return response.data;
                                }
                                else {
                                        set((state) => {
                                                state.error = 'Failed to delete user.';
                                        });

                                }

                        } catch (error) {
                                const errorMessage =
                                        (error as AxiosError<{ message?: string }>).response?.data?.message ||
                                        'Something went wrong';

                                set((state) => {
                                        state.error = errorMessage;
                                        state.loading = false;
                                });
                                throw new Error(errorMessage);
                        }
                },
        }))
);
