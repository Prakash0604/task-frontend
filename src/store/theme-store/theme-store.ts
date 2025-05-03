import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
        theme: "light" | "dark";
        toggleTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
        if (typeof window !== "undefined" && window.matchMedia) {
                return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "light";
};

export const useThemeStore = create<ThemeState>()(
        persist(
                (set) => ({
                        theme: getSystemTheme(),
                        toggleTheme: () =>
                                set((state) => ({
                                        theme: state.theme === "light" ? "dark" : "light",
                                })),
                }),
                {
                        name: "theme-storage",

                }
        )
);
