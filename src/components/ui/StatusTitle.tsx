import { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import {
    useQueryClient,
    QueryClient,
    useMutation,
} from "@tanstack/react-query";

interface Status {
    _id: number;
    name: string;
}

interface Props {
    status: Status;
}

const deleteStatus = async (statusId: any) => {
    try {
        const { data } = await axios.delete(
            "http://localhost:5000/jiraStatuses",
            {
                data: {
                    _id: statusId,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
};
export const StatusTitle = ({ status }: Props) => {
    const queryClient = useQueryClient();
    const statusDeleteMutation = useMutation(deleteStatus, {
        onMutate: (variables) => {
            console.log(variables)
            queryClient.setQueryData(["statuses"], (currentStatuses: any ) => {
                const newStatuses = currentStatuses.filter((status: any) => {
                    console.log( "status" ,status)
                    console.log( "id" ,variables)
                    return status._id !== variables
                });
                console.log(newStatuses);
                return [...newStatuses];
            })
        },
        onSettled: (data) => {
            queryClient.invalidateQueries(["statuses"]);
        },
        onError: () => {

        }
    });
    const [edit, setEdit] = useState(false);
    const [wantToDelete, setWantToDelete] = useState(false);

    const onDelete = (statusId: any) => {
        statusDeleteMutation.mutate(statusId);
        setWantToDelete(false);
    };

    return (
        <>
            {edit ? (
                <Box>edit</Box>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" component="p">
                        {status.name}
                    </Typography>
                    {!wantToDelete ? (
                        <Button onClick={() => setWantToDelete(true)}>
                            {" "}
                            <DeleteForeverIcon />{" "}
                        </Button>
                    ) : (
                        <Box>
                            <Button onClick={() => setWantToDelete(false)}>
                                {" "}
                                cancel
                            </Button>
                            <Button
                                variant={"contained"}
                                onClick={() => onDelete(status._id)}
                            >
                                {" "}
                                delete
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};
