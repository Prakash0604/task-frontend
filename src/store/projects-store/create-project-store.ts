import API from '@/config/request';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Project = {
        title: string;
        description: string;
};

type ProjectState = {
        projects: Project[];
        loading: boolean;
        error: string | null;
        addNewProject: (title: string, description: string) => Promise<Project | null>;
};

export const useCreateProjectStore = create<ProjectState>()(
        immer((set) => ({
                projects: [],
                loading: false,
                error: null,
                addNewProject: async (title, description) => {
                        set((state) => {
                                state.loading = true;
                                state.error = null;
                        });
                        try {
                                const response = await API.post('/projects', { title, description });
                                const newProject: Project = response.data;
                                set((state) => {
                                        state.projects.push(newProject);
                                        state.loading = false;
                                        state.error = null;
                                });
                                return newProject;
                        } catch (error) {
                                const errorMessage =
                                        (error as AxiosError<{ message?: string }>).response?.data?.message ||
                                        'Failed to Create Projects';
                                set((state) => {
                                        state.error = errorMessage;
                                        state.loading = false;
                                        state.error = "Failed to create Error";
                                });

                                throw new Error(errorMessage);
                        }
                },
        }))
);
