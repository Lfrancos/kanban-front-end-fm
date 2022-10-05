import { Icon } from "../Icon";
import { Typography, Box, Button, Switch, Divider, Card } from "@mui/joy";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { BoardForm } from "../form/BoardForm";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { BoardItem } from "../ui/BoardItem";
import { useBoardsStore } from '../../store/boardStore';

interface Boards {
    _id: string;
    title: string;
    tasks: string[];
}

interface Props {
    boards?: Boards[];
}

export const BoardMenu = ({ boards = [] }: Props) => {

    const [createBoard, setCreateBoard] = useState(false);
    const onCreateBoard = () => {
        console.log("open...");
        setCreateBoard(!createBoard);
    };

    return (
        <Box
            sx={{
                backgroundColor: "var(--background-transparent-dark)",
                height: "calc(100vh - var(--header-height))",
                width: "100vw",
                padding: "1rem",
            }}
        >
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
                    ALL BOARDS ( {boards.length > 0 ? `${boards.length}` : `0`}{" "}
                    )
                </Typography>
                {boards.length > 0 ? (
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {boards.map((board: any) => (
                            <li
                                style={{ margin: "none", padding: 0 }}
                                key={board._id}
                            >
                                <BoardItem title={board.title} id={board._id}  />
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
        </Box>
    );
};
