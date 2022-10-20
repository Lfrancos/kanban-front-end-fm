import { Box, CircularProgress } from '@mui/joy';

export const Loading = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {" "}
            <CircularProgress variant="outlined" />{" "}
        </Box>
    );
};
