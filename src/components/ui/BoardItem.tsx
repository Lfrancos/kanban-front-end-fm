import { Button, Typography, Box } from "@mui/joy";
import { Icon } from "../Icon";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRouter } from "next/router";
import { useBoardsStore } from "./../../store/boardStore";
import { useState } from "react";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";
import { DeleteMessage } from "../DeleteMessage";
import shallow from "zustand/shallow";

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

    ////// this is the board store /////

    const {
        selectedBoard,
        toggleDeleteBoard,
        deleteBoard,
        changeSelectedBoard,
        toggleBoardsMenu,
        changeBoardToDelete,
    } = useBoardsStore(
        (state) => ({
            changeSelectedBoard: state.changeSelected,
            selectedBoard: state.selectedBoard,
            toggleDeleteBoard: state.toggleDeleteBoard,
            deleteBoard: state.deleteBoard,
            toggleBoardsMenu: state.toggleBoardsMenu,
            changeBoardToDelete: state.changeBoardToDelete,
        }),
        shallow
    );

    // this gives you the object of the board that is selected if you have one selected



    const handleChangeOfBoard = () => {
        router.push(id ? `/boards/${id}` : "/");
        if (id) {
            changeSelectedBoard(id, title);
            toggleBoardsMenu();
        }
    };


    const handleEditing = () => {
        setEditing(!editing);
        changeBoardToDelete(id, title);
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
                    onClick={onClick ? onClick : handleChangeOfBoard}
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
                        onClick={handleEditing}
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
                            <>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                >
                                    edit
                                </Typography>
                                <Typography
                                    color={"danger"}
                                    onClick={() => {
                                        toggleDeleteBoard();
                                        setEditing(!editing);
                                    }}
                                >
                                    delete
                                </Typography>
                            </>
                        </Box>
                    </>
                )}
            </Box>

            {/* {deleteBoard && (
                <DeleteMessage title={title} onCancel={toggleDeleteBoard} element={"board"} />
            )} */}
        </>
    );
};
