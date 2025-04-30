import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';



interface ProfileData {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        profile: string | null;
        contact: string | null;
        address: string | null;
        created_at: string;
        updated_at: string;
}

interface ProfileResponse {
        status: boolean;
        message: string;
        data: ProfileData;
}

interface AuthState {
        profile: ProfileData | null;
        isLoading: boolean;
        error: string | null;
        fetchProfile: () => Promise<ProfileResponse>;
}

const useAuthStore = create<AuthState>()(
        immer((set) => ({
                profile: null,
                isLoading: false,
                error: null,
                fetchProfile: async (): Promise<ProfileResponse> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });
                        try {
                                const token = getUser()
                                if (!token) {
                                        throw new Error('No token found');
                                }
                                const res = await API.get<ProfileResponse>('/profile', {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });
                                const responseData = res?.data;
                                if (responseData?.status) {
                                        set((state) => {
                                                state.profile = responseData.data;
                                                state.isLoading = false;
                                        });
                                        return responseData;
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Failed to fetch profile';
                                                state.isLoading = false;
                                        });
                                        return responseData;
                                }
                        } catch (error) {
                                const errorMessage = (error as AxiosError<{ message?: string }>).response?.data?.message || 'Failed to fetch profile';
                                set((state) => {
                                        state.error = errorMessage;
                                        state.isLoading = false;
                                });
                                return {
                                        status: false,
                                        message: errorMessage,
                                        data: {
                                                id: 0,
                                                name: '',
                                                email: '',
                                                email_verified_at: null,
                                                profile: null,
                                                contact: null,
                                                address: null,
                                                created_at: '',
                                                updated_at: '',
                                        },
                                };
                        }
                },
        }))
);

export default useAuthStore;