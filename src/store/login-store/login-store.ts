import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { saveUser } from '@/utlis';

interface LoginResponse {
        status: boolean;
        message: string;
        data: {
                token: string;
                name: string;
        };
}

interface AuthState {
        token: string | null;
        name: string | null;
        isLoading: boolean;
        error: string | null;
        login: (email: string, password: string) => Promise<LoginResponse>;
}

const useLoginStore = create<AuthState>()(
        immer((set) => ({
                token: null,
                name: null,
                isLoading: false,
                error: null,
                login: async (email: string, password: string): Promise<LoginResponse> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });
                        try {
                                const res = await API.post<LoginResponse>('/login', { email, password });
                                const responseData = res.data;
                                if (responseData.status) {
                                        set((state) => {
                                                state.token = responseData.data.token;
                                                state.name = responseData.data.name;
                                                state.isLoading = false;
                                        });
                                        saveUser(responseData.data.token)
                                        return responseData;
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Login failed';
                                                state.isLoading = false;
                                        });
                                        return responseData;
                                }
                        } catch (error) {
                                const errorMessage = (error as AxiosError<{ message?: string }>).response?.data?.message || 'Something went wrong';
                                set((state) => {
                                        state.error = errorMessage;
                                        state.isLoading = false;
                                });
                                return {
                                        status: false,
                                        message: errorMessage,
                                        data: { token: '', name: '' },
                                };
                        }
                },
        }))
);

export default useLoginStore;