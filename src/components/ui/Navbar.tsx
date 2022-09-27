import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import useStore from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { CreateButton } from "../buttons/CreateButton";
import Image from "next/image";

const useGetBoards = () => {
    const getBoards = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/boards`);
            return data;
        } catch (error) {
            console.log(error);
            return;
        }
    };
    return useQuery(["boards", getBoards]);
};

export const Navbar = () => {
    const store = useStore((state) => state);
    const setTheme = useStore((state) => state.setTheme);
    const theme = useTheme();
    const boardQuery = useGetBoards();
    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
            }}
        >
            <>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <>
                        <Box
                            sx={{
                                width: 30,
                                height: 30,
                            }}
                        >
                            <Image
                                src={"/assets/logo-mobile.svg"}
                                alt={"kangan logo"}
                                layout={"responsive"}
                                width={60}
                                height={60}
                            />
                        </Box>
                        {boardQuery.isLoading
                            ? console.log("loading")
                            : console.log(boardQuery.data)}
                        {boardQuery.isLoading ? (
                            <Button
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                <Typography variant={"h6"}>Boards</Typography>
                            </Button>
                        ) : boardQuery.isError ? (
                            <Button
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                <Typography variant={"h6"}>Boards</Typography>
                            </Button>
                        ) : (
                            <Button
                                endIcon={
                                    boardQuery.isLoading ? null : boardQuery.isError ? null : (
                                        <KeyboardArrowDownIcon />
                                    )
                                }
                            >
                                <Typography variant={"h6"} component={"h2"}>
                                    {" "}
                                    Platform Launch{" "}
                                </Typography>
                            </Button>
                        )}
                    </>
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <CreateButton />
                    <Button sx={{
                        margin: 0,
                        padding: 0,
                        minWidth: "auto"
                    }}>
                        <MoreVertIcon />
                    </Button>
                </Box>
            </>
        </Box>
    );
};
