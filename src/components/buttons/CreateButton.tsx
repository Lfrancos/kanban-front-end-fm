import { Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

export const CreateButton = () => {
    return (
        <Button
            sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                width: 30,
                height: 32,
                borderRadius: 7,
                margin: 0,
                padding: 0,
                minWidth: 50
            }}
        >
            <AddIcon />
        </Button>
    );
};
