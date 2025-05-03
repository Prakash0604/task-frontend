import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';

interface CreatedUserData {
        id: number;
        name: string;
        email: string;
        address: string;
        contact: string;
        created_at: string;
        updated_at: string;
}

interface CreateUserPayload {
        name: string;
        email: string;
        address: string;
        contact: string;
        password: string;
        profile: File;
}

interface CreateUserResponse {
        status: boolean;
        code: number;
        message: string;
        data?: CreatedUserData;
}

interface CreateUserState {
        isCreating: boolean;
        error: string | null;
        successMessage: string | null;
        User: CreatedUserData | null;
        createUser: (payload: CreateUserPayload) => Promise<CreateUserResponse>;
}

const useCreateUserStore = create<CreateUserState>()(
        immer((set) => ({
                isCreating: false,
                error: null,
                successMessage: null,
                User: null,
                createUser: async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
                        set((state) => {
                                state.isCreating = true;
                                state.error = null;
                                state.successMessage = null;
                                state.User = null;
                        });

                        const formData = new FormData();
                        formData.append('name', payload.name);
                        formData.append('email', payload.email);
                        formData.append('address', payload.address);
                        formData.append('contact', payload.contact);
                        formData.append('password', payload.password);
                        formData.append('profile', payload.profile);

                        try {
                                const token = getUser();
                                if (!token) throw new Error('No token found');

                                const res = await API.post<CreateUserResponse>('/users', formData, {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                                'Content-Type': 'multipart/form-data',
                                        },
                                });

                                const responseData = res.data;

                                if (responseData.status) {
                                        set((state) => {
                                                state.successMessage = responseData.message;
                                                state.User = responseData.data ?? null;
                                                state.isCreating = false;
                                        });
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'User creation failed';
                                                state.isCreating = false;
                                        });
                                }

                                return responseData;
                        } catch (error) {
                                const errorMessage =
                                        (error as AxiosError<{ message?: string }>).response?.data?.message ||
                                        'Something went wrong';

                                set((state) => {
                                        state.error = errorMessage;
                                        state.isCreating = false;
                                });

                                return {
                                        status: false,
                                        code: 500,
                                        message: errorMessage,
                                };
                        }
                },
        }))
);

export default useCreateUserStore;
