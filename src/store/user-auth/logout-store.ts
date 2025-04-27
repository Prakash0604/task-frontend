import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser, removeUser } from '@/utlis';

interface LogoutResponse {
        status: boolean;
        message: string;
}

interface LogoutState {
        isLoading: boolean;
        error: string | null;
        logout: () => Promise<LogoutResponse>;
}


const useLogoutStore = create<LogoutState>()(
        immer((set) => ({
                isLoading: false,
                error: null,
                logout: async (): Promise<LogoutResponse> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });
                        try {
                                const token = getUser();
                                if (!token) {
                                        throw new Error('No token found');
                                }
                                const res = await API.get<LogoutResponse>('/logout', {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });
                                const responseData = res?.data;
                                if (responseData?.status) {
                                        set((state) => {
                                                state.isLoading = false;
                                        });
                                        removeUser()
                                        return responseData;
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Logout failed';
                                                state.isLoading = false;
                                        });
                                        return responseData;
                                }
                        } catch (error) {
                                const errorMessage = (error as AxiosError<{ message?: string }>).response?.data?.message || 'Logout failed';
                                set((state) => {
                                        state.error = errorMessage;
                                        state.isLoading = false;
                                });
                                return {
                                        status: false,
                                        message: errorMessage,
                                };
                        }
                },
        }))
);

export default useLogoutStore;
