import API from '@/config/request';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AxiosError } from 'axios';
import { getUser } from '@/utlis';
interface Project {
        id: number;
        title: string;
        description: string;
        status: string;
        created_at: string;
        updated_at: string;
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

interface ProjectsResponse {
        success: boolean;
        message: string;
        status_code: number;
        data: Project[];
        meta: Meta;
}

interface ProjectsState {
        projects: Project[] | null;
        meta: Meta | null;
        isLoading: boolean;
        error: string | null;
        fetchProjects: () => Promise<ProjectsResponse>;
}

const useProjectsStore = create<ProjectsState>()(
        immer((set) => ({
                projects: null,
                meta: null,
                isLoading: false,
                error: null,
                fetchProjects: async (): Promise<ProjectsResponse> => {
                        set((state) => {
                                state.isLoading = true;
                                state.error = null;
                        });
                        try {
                                const token = getUser();
                                if (!token) {
                                        throw new Error('No token found');
                                }
                                const res = await API.get<ProjectsResponse>('/projects', {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });
                                const responseData = res.data;
                                if (responseData.success) {
                                        set((state) => {
                                                state.projects = responseData.data;
                                                state.meta = responseData.meta;
                                                state.isLoading = false;
                                        });
                                } else {
                                        set((state) => {
                                                state.error = responseData.message || 'Failed to fetch projects';
                                                state.isLoading = false;
                                        });
                                }
                                return responseData;
                        } catch (error) {
                                const errorMessage = (error as AxiosError<{ message?: string }>).response?.data?.message || 'Something went wrong';
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

export default useProjectsStore;
