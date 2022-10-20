import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { useQuery, useMutation } from "@tanstack/react-query";

import { Box, Button, Typography } from "@mui/joy";
// Why is this working if it should be saying that it didn't find the material library since I uninstall it

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { CreateButton } from "../buttons/CreateButton";
import { BoardMenu } from "../menu/BoardMenu";
import { useRouter } from "next/router";
import { useBoardsStore } from "./../../store/boardStore";
import { useGetBoards } from "../../hooks/useGetBoards";

export const Navbar = () => {
    const selectedBoard = useBoardsStore((state) => state.selectedBoard);
    const changeSelectedBoard = useBoardsStore((state) => state.changeSelected);
    const router = useRouter();

    const boardMenu = useBoardsStore((state) => state.boardsMenuOpen);
    const toggleBoardsMenu = useBoardsStore((state) => state.toggleBoardsMenu);

    const boardsQuery = useGetBoards();

    const handleBoardMenuClick = () => {
        toggleBoardsMenu();
        if (!selectedBoard._id) {
            if (boardsQuery.data && boardsQuery.data.length > 0) {
                const { _id, title } = boardsQuery.data[0];
                changeSelectedBoard(_id, title);
                router.push(`/boards/${_id}`);
            }
        }
    };
    return (
        <>
            <Box
                component="header"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                    height: "var(--header-height)",
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
                            {/* {boardsQuery.isLoading ? console.log("loading") : console.log(boardsQuery.data)} */}
                            {selectedBoard.title.length <= 0 ? (
                                <Button
                                    variant="plain"
                                    endDecorator={
                                        boardMenu ? (
                                            <KeyboardArrowUpIcon />
                                        ) : (
                                            <KeyboardArrowDownIcon />
                                        )
                                    }
                                    onClick={handleBoardMenuClick}
                                >
                                    <Typography level={"h6"}>Boards</Typography>
                                </Button>
                            ) : (
                                <Button
                                    variant="plain"
                                    endDecorator={
                                        boardMenu ? (
                                            <KeyboardArrowUpIcon />
                                        ) : (
                                            <KeyboardArrowDownIcon />
                                        )
                                    }
                                    onClick={handleBoardMenuClick}
                                >
                                    <Typography
                                        sx={{
                                            textTransform: "capitalize",
                                        }}
                                        fontWeight={"lg"}
                                        level={"h6"}
                                        component={"h2"}
                                    >
                                        {`${selectedBoard.title}`}
                                    </Typography>
                                </Button>
                            )}
                        </>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CreateButton
                            disabled={
                                selectedBoard.statuses.length > 1 ? false : true
                            }
                        />
                        <Button
                            sx={{
                                margin: 0,
                                padding: 0,
                                minWidth: "auto",
                            }}
                            variant={"plain"}
                        >
                            <MoreVertIcon />
                        </Button>
                    </Box>
                </>
            </Box>
            {boardMenu && (
                <BoardMenu/>
            )}
        </>
    );
};
