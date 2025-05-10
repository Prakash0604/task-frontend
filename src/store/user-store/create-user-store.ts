import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import API from '@/config/request';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';

interface UserData {
        name: string;
        email: string;
        address: string;
        password: string;
        contact: string;
        profile?: File;
}

interface UserStore {
        user: UserData | null;
        loading: boolean;
        error: string | null;
        createUser: (data: UserData) => Promise<UserData | null>;
}

export const useCreateUserStore = create<UserStore>()(
        immer((set) => ({
                user: null,
                loading: false,
                error: null,

                createUser: async (data) => {
                        set((state) => {
                                state.loading = true;
                                state.error = null;
                        });

                        try {
                                const token = getUser();
                                if (!token) {
                                        throw new Error('No token found');
                                }
                                const formData = new FormData();
                                formData.append('name', data.name);
                                formData.append('email', data.email);
                                formData.append('address', data.address);
                                formData.append('password', data.password);
                                formData.append('contact', data.contact);
                                if (data.profile) {
                                        formData.append('profile', data.profile);
                                }
                                const response = await API.post('/users', formData, {
                                        headers: {
                                                'Content-Type': 'multipart/form-data',
                                                Authorization: `Bearer ${token}`,
                                        },
                                });
                                if (response.status) {
                                        set((state) => {
                                                state.user = response.data;
                                                state.loading = false;
                                        });
                                        return response.data;

                                }
                                else {
                                        set((state) => {
                                                state.user = null;
                                                state.loading = false;
                                        })
                                        return null
                                }

                        } catch (error) {
                                const errorMessage =
                                        (error as AxiosError<{ message?: string }>).response?.data?.message ||
                                        'We are sorry, there was a problem. Please check the details and try again.';

                                set((state) => {
                                        state.error = errorMessage;
                                        state.loading = false;
                                });
                                throw new Error(errorMessage);
                        }
                },
        }))
);
