import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { lightTheme, darkTheme } from "../themes";

interface Props {
    children: JSX.Element;
}

export const Theme = ({ children }: Props) => {
    const { theme } = useAppSelector((state) => state.ui);
    return (
        <ThemeProvider theme={theme.lightMode ? lightTheme : darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
