import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';

interface User {
        id: number;
        name: string;
        email: string;
        address: string;
        contact: string;
        profile: string | null;
        user_type_id: number | null;
        user_type: string | null;
        clients: { id?: number; name?: string; email?: string }[];
}

interface UsersState {
        user: User | null;
        isLoading: boolean;
        error: string | null;
        getUserById: (id: number) => Promise<void>;
}

const useUsersGetIdStore = create<UsersState>()(
        immer((set) => ({
                user: null,
                isLoading: false,
                error: null,
                getUserById: async (id: number): Promise<void> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });
                        try {
                                const token = getUser();
                                if (!token) throw new Error('No token found');
                                const res = await API.get(`/users/${id}`, {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });

                                const responseData = res.data;
                                if (responseData.success) {
                                        set((state) => {
                                                state.user = responseData.data; // store the single user data
                                                state.isLoading = false;
                                        });
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Failed to fetch user';
                                                state.isLoading = false;
                                        });
                                }
                        } catch (error) {
                                const errorMessage =
                                        (error as AxiosError<{ message?: string }>).response?.data?.message ||
                                        'An error occurred. Please try again later.';

                                set((state) => {
                                        state.error = errorMessage;
                                        state.isLoading = false;
                                });
                        }
                },
        }))
);

export default useUsersGetIdStore;
