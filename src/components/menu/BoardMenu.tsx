import {
    Typography,
    Box,
    Switch,
    Divider,
    Card,
    Alert,
    CircularProgress,
} from "@mui/joy";
import { useState } from "react";
import shallow from "zustand/shallow";

import { BoardForm } from "../form/BoardForm";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { BoardItem } from "../ui/BoardItem";
import { useBoardsStore } from "../../store/boardStore";
import { useGetBoards } from "../../hooks/useGetBoards";
import { LightBox } from "../LightBox";
import { DeleteMessage } from "../DeleteMessage";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";

export const BoardMenu = () => {

    // This are the all the elements that I need form the Boards STORE ///
    const {
        boardCreated,
        toggleBoardCreated,
        boardToDelete,
        toggleDeleteBoard,
        deleteBoard,
    } = useBoardsStore(
        (state) => ({
            boardCreated: state.boardCreated,
            toggleBoardCreated: state.toggleBoardCreated,
            boardToDelete: state.boardToDelete,
            toggleDeleteBoard: state.toggleDeleteBoard,
            deleteBoard: state.deleteBoard,
        }),
        shallow
    );

    const deleteBoardMutation = useDeleteBoard();

    const handleDelete = (boardId?: string) => {
        if (typeof boardId !== "undefined") {
            deleteBoardMutation.mutate(boardId);
            toggleDeleteBoard();
        }
        return;
    };



    const [createBoard, setCreateBoard] = useState(false);

    const onCreateBoard = () => {
        setCreateBoard(!createBoard);
    };

    const boards = useGetBoards();

    // const boardToDelete = useBoardsStore((state) => state.boardToDelete);

    boards.isLoading ? console.log("loading...") : console.log(boards.data);

    return (
        <>
            <LightBox header={true}>
                <Card
                    sx={{
                        minWidth: "300px",
                        margin: "0 auto",
                        backgroundColor: "white",
                        borderRadius: "1rem",
                        padding: "0  ",
                    }}
                >
                    <Typography
                        sx={{
                            p: 0,
                            pl: "2rem",
                            letterSpacing: 2,
                            mt: "2rem",
                            mb: "1rem",
                            color: "text.secondary",
                        }}
                        fontWeight={"lg"}
                    >
                        ALL BOARDS ({" "}
                        {boards.isLoading ? (
                            <CircularProgress />
                        ) : boards.data.data.length > 0 ? (
                            `${boards.data.data.length}`
                        ) : (
                            `0`
                        )}{" "}
                        )
                    </Typography>

                    {boards.isLoading ? (
                        <CircularProgress />
                    ) : boards.data.data.length > 0 ? (
                        <ul
                            style={{ listStyle: "none", margin: 0, padding: 0 }}
                        >
                            {boards.data.data.map((board: any) => (
                                <li
                                    style={{ margin: "none", padding: 0 }}
                                    key={board._id}
                                >
                                    <BoardItem
                                        title={board.title}
                                        id={board._id}
                                    />
                                </li>
                            ))}
                        </ul>
                        
                    ) : null}

                    {createBoard ? (
                        <>
                            <Divider />
                            <BoardForm onClose={onCreateBoard} />
                        </>
                    ) : (
                        <Box>
                            <BoardItem onClick={onCreateBoard} />
                        </Box>
                    )}

                    <ThemeSwitcher />
                </Card>
            </LightBox>

            {boardCreated && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 9,
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "start",
                    }}
                >
                    <Alert sx={{ mt: 5, mr: 5 }} color="success">
                        The board has been created
                    </Alert>
                </Box>
            )}

            {deleteBoard && (
                <DeleteMessage
                    onCancel={toggleDeleteBoard}
                    onDelete={() => handleDelete(boardToDelete._id)}
                    board={boardToDelete}
                />
            )}
        </>
    );
};
