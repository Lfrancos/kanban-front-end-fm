import { Box } from "@mui/joy";


interface Props {
    children?: JSX.Element;
    header?: boolean;
}
export const LightBox = ({children, header = false}: Props) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: `${header ? "var(--header-height)" : 0}`,
                // top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "var(--background-transparent-dark)",
                height: `${header ? "calc(100vh - var(--header-height))" : '100vh'}`,
                width: "100vw",
                padding: "1rem",
                zIndex: 999,
            }}
        >
            {children}
        </Box>
    );
};
