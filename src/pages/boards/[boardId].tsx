import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { CircularProgress, Box, Button, Typography, Sheet } from "@mui/joy";

import { Navbar } from "../../components/ui/Navbar";
import { useGetBoard } from "../../hooks/useGetBoard";
import { useBoardsStore } from "../../store/boardStore";
import { useHydrated } from "../../hooks/useHydrated";
import { Loading } from "../../components/Loading";

import AddIcon from "@mui/icons-material/Add";
import useStatusStore from "../../store/statusStore";
import { StatusCard } from "../../components/StatusCard";
import { CreateButton } from "../../components/buttons/CreateButton";
import { StatusCreate } from "../../components/StatusCreate";

const BoardId: NextPage = () => {
    const hydrated = useHydrated();
    const router = useRouter();
    const createStatus = useStatusStore((state) => state.createStatus);
    const toggleCreateStatus = useStatusStore(
        (state) => state.toggleCreateStatus
    );
    const selectedBoard = useBoardsStore((state) => state.selectedBoard);
    const id = selectedBoard._id;
    const boardQuery = useGetBoard(id);

    if (!hydrated) return <Loading />;

    if (typeof window !== "undefined") {
        if (selectedBoard._id) {
        } else {
            router.push("/");
        }
    }
    const onCreateStatus = () => {
        toggleCreateStatus();
    };

    return (
        <>
            <Navbar />
            {!createStatus ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "var(--height-full)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        p: 3,
                    }}
                >
                    {boardQuery.isLoading ? (
                        <CircularProgress />
                    ) : boardQuery.data.data[0].statuses.length < 1 ? (
                        <>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    textAlign: "center",
                                }}
                                level={"h4"}
                            >
                                You have no statuses, create one to get started
                            </Typography>

                            <CreateButton size="lg" onClick={onCreateStatus}>
                                Add new status
                            </CreateButton>
                        </>
                    ) : (
                        <p>Text</p>
                    )}
                </Box>
            ) : <StatusCreate />}
        </>
    );
};

export default BoardId;
