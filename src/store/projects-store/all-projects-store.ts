
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios, { AxiosError } from 'axios';
import API from '@/config/request';
import { getUser } from '@/utlis';

interface Project {
        id: number;
        title: string;
        description: string;
        status: string;
        created_at: string | null;
        updated_at: string;
}

interface ProjectStore {
        projects: Project[];
        loading: boolean;
        error: string | null;
        currentPage: number;
        fetchProjects: (page?: number) => Promise<Project[] | null>;
}

export const useAllProjectStore = create<ProjectStore>()(
        immer((set) => ({
                projects: [],
                loading: false,
                error: null,
                currentPage: 1,
                fetchProjects: async (page = 1) => {
                        set((state) => {
                                state.loading = true;
                                state.error = null;
                        });

                        try {
                                const token = getUser();
                                if (!token) {
                                        throw new Error('No token found');
                                }

                                const response = await API.get(`/projects?page=${page}`, {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });

                                if (response.data?.success && Array.isArray(response.data.data)) {
                                        const projectData = response.data.data;

                                        set((state) => {
                                                // Append if fetching next page
                                                if (page > 1) {
                                                        state.projects.push(...projectData);
                                                } else {
                                                        state.projects = projectData;
                                                }
                                                state.currentPage = page;
                                                state.loading = false;
                                        });

                                        return projectData;
                                } else {
                                        const fallbackError = 'Invalid response format from server.';
                                        console.error('[ProjectStore] Unexpected API structure:', response.data);
                                        set((state) => {
                                                state.error = fallbackError;
                                                state.loading = false;
                                        });
                                        return null;
                                }
                        } catch (error) {
                                let errorMessage = 'Failed to fetch or No response from the server';
                                if (axios.isAxiosError(error)) {
                                        const axiosError = error as AxiosError<{ message?: string }>;
                                        errorMessage = axiosError.response?.data?.message || axiosError.message;
                                } else if (error instanceof Error) {
                                        errorMessage = error.message;
                                }
                                set((state) => {
                                        state.error = errorMessage;
                                        state.loading = false;
                                });

                                return null;
                        }
                },
        }))
);

