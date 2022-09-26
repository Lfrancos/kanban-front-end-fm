import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    lightMode: true,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (theme) => {
            theme.lightMode = !theme.lightMode;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
