import { Button } from "@mui/joy";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    boardSelected: string;
}

export const CreateButton = ({boardSelected = ''}: Props) => {
    return (
        <Button
            sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                width: 30,
                borderRadius: 25,
                height: 32,
                margin: 0,
                padding: 0,
                minWidth: 50,
            }}
            disabled={ !boardSelected }
        >
            <AddIcon />
        </Button>
    );
};
