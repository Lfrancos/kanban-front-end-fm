import { Box, Button, Sheet, Typography } from "@mui/joy";
import { BoardToDelete } from "../interfaces";
import { LightBox } from "./LightBox";


interface Props {
    onDelete?: any;
    onCancel: () => void;
    board?: BoardToDelete;
    task?: any;
    title?: string;
}

export const DeleteMessage = ({ onCancel, onDelete, board, task }: Props) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "1rem",
                backgroundColor: "var(--background-transparent-dark)",
                zIndex: 999,
            }}
        >
            <Sheet
                sx={{
                    borderRadius: "15px",
                    padding: "1rem",
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography sx={{fontWeight: "bold"}} color="danger" component="h2" level="h4">
                    {" "}
                    Delete this {board ? "board" : "task"}?
                </Typography>
                <Typography sx={{color: "text.secondary"}}>
                    {board
                        ? `Are you sure you want to delete the ‘${board.title}’ board? This action will remove all statuses and task. This cannot be reversed.`
                        : `Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}
                </Typography>
                
                <Button sx={{fontWeight: 'bold'}} fullWidth color="danger" onClick={onDelete}>
                    Delete
                </Button>

                <Button sx={{fontWeight: 'bold', color: "text.terciary"}} variant={"plain"} fullWidth onClick={onCancel}>
                    Cancel
                </Button>
            </Sheet>
        </Box>
    );
};
