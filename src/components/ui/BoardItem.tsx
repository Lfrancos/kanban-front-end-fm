import { Button, Typography, Box } from "@mui/joy";
import { Icon } from "../Icon";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRouter } from "next/router";
import { useBoardsStore } from "./../../store/boardStore";
import { useState } from "react";
import { useDeleteBoard } from '../../hooks/useDeleteBoard';

interface Props {
    title?: string;
    onClick?: () => void;
    id?: string;
}



export const BoardItem = ({
    title = "Create new board",
    id,
    onClick,
}: Props) => {
    // this is the state for the box menu to edit or delete
    const [editing, setEditing] = useState(false);

    // this gives you the object of the board that is selected if you have one selected
    const selectedBoard = useBoardsStore((state) => state.selectedBoard);
    // this is the function to change the selected board
    const changeSelectedBoard = useBoardsStore((state) => state.changeSelected);
    // this will open or close the menu of the boards
    const toggleBoardsMenu = useBoardsStore((state) => state.toggleBoardsMenu);

    const deleteBoardMutation = useDeleteBoard();

    const handleChangeOfBoard = () => {
        router.push(id ? `/boards/${id}` : "/");
                                  if (id) {
                                      changeSelectedBoard(id, title);
                                      toggleBoardsMenu();
                                  }
    }

    const handleDelete = (boardId?: string ) => {
        if ( typeof boardId !== "undefined" ) {
            deleteBoardMutation.mutate(boardId);
        }
    };

    const router = useRouter();
    return (
        <>
            <Box
                sx={{
                    mx: 0,
                    p: 0,
                    pl: "2rem",
                    py: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: `${
                        selectedBoard._id === id ? "hsl(var(--purple))" : null
                    }`,
                    borderRadius: 0,
                    borderTopRightRadius: "40px",
                    borderBottomRightRadius: "40px",
                    width: "80%",
                    textAlign: "left",
                    position: "relative",
                }}
            >
                <Button
                    sx={{
                        p: 0,
                        m: 0,
                    }}
                    variant="plain"
                    startDecorator={<Icon src="/assets/icon-board.svg" />}
                    onClick={
                        onClick
                            ? onClick
                            : handleChangeOfBoard
                    }
                >
                    {onClick && <AddIcon />}
                    <Typography
                        sx={{
                            m: 0,
                            color: `${
                                onClick
                                    ? "text.tertiary"
                                    : selectedBoard._id === id
                                    ? "white"
                                    : "text.secondary"
                            }`,
                            textTransform: "capitalize",
                            textAlign: "left",
                            p: 0,
                        }}
                        fontWeight={"lg"}
                    >
                        {title}
                    </Typography>
                </Button>
                {!onClick && (
                    <Button
                        sx={{
                            mr: "1rem",
                            color: `${
                                onClick
                                    ? "text.tertiary"
                                    : selectedBoard._id === id
                                    ? "white"
                                    : "text.secondary"
                            }`,
                        }}
                        variant="plain"
                        onClick={() => setEditing(!editing)}
                    >
                        {" "}
                        <MoreVertIcon />{" "}
                    </Button>
                )}

                {/*  the menu to edit or delete the board item */}


                {editing && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                position: "absolute",
                                backgroundColor: "white",
                                p: 2,
                                top: "3rem",
                                right: 0,
                                zIndex: 99999,
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                edit
                            </Typography>
                            <Typography
                                color={"danger"}
                                onClick={() => handleDelete(id)}
                            >
                                delete
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};
