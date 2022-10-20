import { Button } from "@mui/joy";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    disabled?: boolean;
    children?: string;
    onClick?: any;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export const CreateButton = ({
    onClick,
    children,
    disabled = false,
    size = "md",
    fullWidth
}: Props) => {
    return (
        <Button
            sx={{my:2}}
            fullWidth={fullWidth ? true : false}
            size={size}
            disabled={disabled ? true : false}
            startDecorator={children ? <AddIcon /> : null}
            onClick={onClick ? onClick : null}
        >
            {!children ? <AddIcon /> : children}
        </Button>
    );
};
