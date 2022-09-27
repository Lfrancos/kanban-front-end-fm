import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import useStore from "../store/store";
import { lightTheme, darkTheme } from "../themes";

interface Props {
    children: JSX.Element;
}

export const Theme = ({ children }: Props) => {
    const theme = useStore(state => state.theme);
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
