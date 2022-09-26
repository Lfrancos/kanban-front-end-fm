import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { StatusCard } from "../ui/StatusCard";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

import { useAppDispatch } from "./../../store/hooks";
import { removeStatus, addStatus } from "../../store/entities/statusesSlice";

import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addState = async (stateName: string) => {
    const { data } = await axios.post("http://localhost:5000/jiraStatuses", {
        name: stateName,
    });
    return data;
};

export const CreateStatus = () => {
    const queryClient = useQueryClient();

    const statusesMutation = useMutation(addState, {

        onMutate: (variables) => {
            console.log("variables" ,variables)
            queryClient.setQueryData(["statuses"], (currentStatuses: any):any => {
                console.log(currentStatuses);
                return [...currentStatuses, { _id: '1234',  name: variables }];
            });
        },
        onSuccess: (data) => {

        },
        onSettled: (data) => {
            queryClient.invalidateQueries(["statuses"]);
        },
    });
    const [isAdding, setIsAdding] = useState(false);
    const [input, setInput] = useState("");
    const [wasSelected, setWasSelected] = useState(false);

    // const statusMutation = useMutation(addState);

    // const dispatch = useAppDispatch();

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInput(e.target.value);
    };
    const onClick = () => {
        setIsAdding(!isAdding);
    };

    const onCancel = () => {
        setIsAdding(false);
        setWasSelected(false);
        setInput("");
    };

    const onSubmit = () => {
        if (input.length < 1) {
            return;
        } else {
            console.log("you have submitted...");
            statusesMutation.mutate(input);
            setIsAdding(false);
            setInput("");
        }
    };

    return (
        <StatusCard type={"create"}>
            <Box
                sx={{
                    minHeight: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {isAdding ? (
                    <>
                        <Box sx={{ width: "100%" }}>
                            <TextField
                                sx={{ width: "100%", marginBottom: 2 }}
                                variant="outlined"
                                autoFocus
                                multiline
                                label={"Name of the state"}
                                value={input}
                                onChange={onChange}
                                onBlur={() => setWasSelected(true)}
                                error={input.length < 1 && wasSelected}
                                helperText={
                                    input.length < 1 &&
                                    wasSelected &&
                                    "This input can not be empty"
                                }
                            />
                            <Box
                                sx={{ display: "flex", justifyContent: "end" }}
                            >
                                <Button onClick={onCancel}>Cancel</Button>
                                <Button
                                    onClick={onSubmit}
                                    variant={"contained"}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        <Container
                            onClick={onClick}
                            sx={{
                                padding: 3,
                                display: "flex",
                                justifyContent: "center",
                                ":hover": {
                                    cursor: "pointer",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Create Status Card</Typography>
                                <Button>
                                    {" "}
                                    <AddIcon />{" "}
                                </Button>
                            </Box>
                        </Container>
                    </>
                )}
            </Box>
        </StatusCard>
    );
};
