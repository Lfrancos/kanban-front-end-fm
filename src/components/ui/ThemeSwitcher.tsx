import { Switch, Box } from "@mui/joy";
import { Icon } from "../Icon";

export const ThemeSwitcher = () => {
    // const setTheme = useStore((state) => state.setTheme);

    return (
        <Box
            sx={{
                width: "fit-content",
                display: "flex",
                gap: 3,
                alignItems: "center",
                mx: "auto",
                mb: "3rem",
                mt: "2rem"
            }}
        >
            <Icon src={"/assets/icon-light-theme.svg"} />
            {/* <Switch onClick={setTheme} /> */}
            <Icon src={"/assets/icon-dark-theme.svg"} />
        </Box>
    );
};
