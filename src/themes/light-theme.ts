import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    typography: {
        fontFamily: "Plus Jakarta Sans, sans-serif",
        h1: {
            fontWeight: "700",
        },
        h2: {
            fontWeight: "700",
        },
        h3: {
            fontWeight: "700",
        },
        h4: {
            fontWeight: "700",
        },
        h5: {
            fontWeight: "700",
        },
        h6: {
            fontWeight: "700",
        },
    },
    palette: {
        mode: "light",
        primary: {
            contrastText: "#fff",
            dark: "#1565c0",
            light: "#42a5f5",
            main: "#635FC7",
        },
        text: {
            disabled: "rgba(0, 0, 0, 0.38)",
            primary: "#000112",
            primaryChannel: "0 0 0",
            secondary: "rgba(0, 0, 0, 0.6)",
            secondaryChannel: "0 0 0",
        },
        warning: {
            contrastText: "#fff",
            dark: "#e65100",
            light: "#ff9800",
            main: "#EA5555",
            secondary: "#FF9898",
        },
    },
});
