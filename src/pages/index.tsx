import type { NextPage } from "next";
import { Box, Container, Button, Typography } from "@mui/material";
import axios from "axios";

import { Navbar } from "../components/ui/Navbar";

import { StatusTitle } from "../components/ui/StatusTitle";
import { StatusCard } from "../components/ui/StatusCard";
import { CreateStatus } from "../components/buttons/CreateStatus";
import { Theme } from "../components/Theme";
import { useGetStatuses } from "../hooks/useGetStatuses";
import * as interfaces from "../interfaces";

const endPoint = "http://localhost:5000";

const Home: NextPage = () => {
    const statusesQuery = useGetStatuses();

    return (
        <Theme>
            <>
                <Navbar />
                <Box component={"main"}>
                    {statusesQuery.isLoading ? (
                        <p>loading...</p>
                    ) : (
                        <>
                            <Container
                                sx={{
                                    display: "flex",
                                    gap: 4,
                                    marginTop: 2,
                                    padding: 2,
                                    overflow: "auto",
                                }}
                            >
                                {statusesQuery.data.length > 0 && (
                                    <>
                                        {statusesQuery.data.map(
                                            (status: interfaces.Statuses) => (
                                                <StatusCard key={status._id}>
                                                    <StatusTitle
                                                        status={status}
                                                    />
                                                </StatusCard>
                                            )
                                        )}
                                    </>
                                )}
                                <CreateStatus />
                            </Container>
                        </>
                    )}
                </Box>
            </>
        </Theme>
    );
};

export default Home;
