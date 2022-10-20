import { Sheet, Typography } from "@mui/joy";

interface Props {
    title?: string;
    children?: JSX.Element
}

export const StatusCard = ({ children, title = "" }: Props) => {
    return (
        <Sheet
            variant="outlined"
            sx={{ minWidth: "80%", height: "var(--height-full)", m: 2, p: 2 }}
        >
            <Typography> {title} </Typography>
            {children}
        </Sheet>
    );
};
