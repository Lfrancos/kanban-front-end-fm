import { StateCreator } from "zustand";

export interface ThemeSlice {
    theme: string;
    setTheme: any;
}

const themeSlice: StateCreator<ThemeSlice> = (set, get) => ({
    theme: "light",
    setTheme: () => {
        return get().theme === "light" ? set({ theme: "dark" }) : set({ theme: "light" });
    },
});

export default themeSlice;
