import { Box } from "@mui/material";
import Image from "next/image";

interface Props {
    src: string;
    alt?: string;
    imageWidth?: string;
    imageHeight?: string;
    containerWidth?: string;
    containerHeight?: string;
}

export const Icon = ({
    src,
    alt = "icon",
    imageWidth = "20px",
    imageHeight = "20px",
    containerHeight = "20px",
    containerWidth = "20px",
}: Props) => {
    return (
        <Box
            sx={{
                width: `${containerWidth}`,
                height: `${containerHeight}`,
            }}
        >
            <Image
                src={src}
                alt={`icon ${alt}`}
                layout={"responsive"}
                width={imageWidth}
                height={imageHeight}
            />
        </Box>
    );
};
