import { Box } from "@mui/material";

interface Props {
    children?: JSX.Element;
    type?: "normal" | "create";
}

export const StatusCard = ({ children, type = "normal" }: Props) => {
    const bColor = type === "create" ? "red" : "white";
    const border = type === "create" ? "1px dashed gray" : "1px solid gray";

    return (
        <Box
            sx={{
                border: { border },
                minHeight: "calc(100vh - 150px)",
                backgroundColor: { bColor },
                padding: 2,
                minWidth: 320,
                maxWidth: "25%",
            }}
        >
            {children}
        </Box>
    );
};
