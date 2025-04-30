import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';

interface User {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        profile: string | null;
        contact: string;
        address: string;
        created_at: string;
        updated_at: string;
        is_verified: string;
        office_status: string | null;
        status: string;
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

interface UsersResponse {
        success: boolean;
        message: string;
        status_code: number;
        data: User[];
        meta: Meta;
}

interface UsersState {
        users: User[] | null;
        meta: Meta | null;
        isLoading: boolean;
        error: string | null;
        fetchUsers: () => Promise<UsersResponse>;
}

const useUsersStore = create<UsersState>()(
        immer((set) => ({
                users: null,
                meta: null,
                isLoading: false,
                error: null,
                fetchUsers: async (): Promise<UsersResponse> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });

                        try {
                                const token = getUser();
                                if (!token) {
                                        throw new Error('No token found');
                                }

                                const res = await API.get<UsersResponse>('/users', {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });

                                const responseData = res.data;

                                if (responseData.success) {
                                        set((state) => {
                                                state.users = responseData.data;
                                                state.meta = responseData.meta;
                                                state.isLoading = false;
                                        });
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Failed to fetch users';
                                                state.isLoading = false;
                                        });
                                }

                                return responseData;
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

export default useUsersStore;
