
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from 'axios';
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
        hasMore: boolean;
        fetchProjects: (page?: number) => Promise<void>;
        resetProjects: () => void;
}

export const useAllProjectStore = create<ProjectStore>()(
        immer((set) => ({
                projects: [],
                loading: false,
                error: null,
                currentPage: 1,
                hasMore: true,
                fetchProjects: async (page = 1) => {
                        set((state) => {
                                state.loading = true;
                                state.error = null;
                        });

                        try {
                                const token = getUser();
                                if (!token) throw new Error('No token found');

                                const response = await API.get(`/projects?page=${page}`, {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                });

                                const { data, meta } = response.data;

                                set((state) => {
                                        if (page === 1) {
                                                state.projects = data;
                                        } else {
                                                state.projects.push(...data);
                                        }
                                        state.currentPage = page;
                                        state.hasMore = meta?.has_more || data.length > 0; // fallback
                                        state.loading = false;
                                });
                        } catch (error) {
                                const message =
                                        axios.isAxiosError(error)
                                                ? error.response?.data?.message || error.message
                                                : error instanceof Error
                                                        ? error.message
                                                        : 'Unknown error';

                                set((state) => {
                                        state.error = message;
                                        state.loading = false;
                                });
                        }
                },

                resetProjects: () =>
                        set((state) => {
                                state.projects = [];
                                state.currentPage = 1;
                                state.hasMore = true;
                                state.error = null;
                        }),
        }))
);

