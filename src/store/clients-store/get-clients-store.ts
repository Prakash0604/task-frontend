import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';

interface Client {
        id: number;
        name: string;
        email: string;
        phone?: string;
        address?: string;
        // Add other fields based on your actual API response
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

interface ClientsResponse {
        success: boolean;
        message: string;
        status_code: number;
        data: Client[];
        meta: Meta;
}

interface ClientsState {
        clients: Client[] | null;
        meta: Meta | null;
        isLoading: boolean;
        error: string | null;
        fetchClients: () => Promise<ClientsResponse>;
}

const useClientsStore = create<ClientsState>()(
        immer((set) => ({
                clients: null,
                meta: null,
                isLoading: false,
                error: null,
                fetchClients: async (): Promise<ClientsResponse> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });

                        try {
                                const token = getUser();
                                if (!token) {
                                        throw new Error('No token found');
                                }

                                const res = await API.get<ClientsResponse>('/clients', {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });

                                const responseData = res.data;

                                if (responseData.success) {
                                        set((state) => {
                                                state.clients = responseData.data;
                                                state.meta = responseData.meta;
                                                state.isLoading = false;
                                        });
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Failed to fetch clients';
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

export default useClientsStore;
