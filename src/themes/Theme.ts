import { extendTheme } from "@mui/joy";

export const theme = extendTheme({

    colorSchemes: {
        light: {
            palette: {
                primary: {
                    solidBg: "hsl(var(--purple))",
                    solidDisabledBg: "hsl(var(--purple-light), .4)",
                },
                danger: {
                    solidBg: "hsl(var(--danger))",
                    plainColor: "hsl(var(--danger))"
                },
                text: {
                    primary: "hsl(var(--dark-black))",
                    secondary: "hsl(var(--medium-gray))",
                    tertiary: "hsl(var(--purple))",
                },
            },
        },
    },

    fontFamily: {
        body: "var(--font)",
    },

    components: {
        JoyButton: {
            styleOverrides: {
                root: {
                    borderRadius: "25px",
                },
            },
        },
    },
});
