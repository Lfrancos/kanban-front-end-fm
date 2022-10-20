import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useBoardsStore } from "../store/boardStore";
import { Board, Response } from "./../interfaces";

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const selectedBoard = useBoardsStore((state) => state.selectedBoard);
    const changeSelectedBoard = useBoardsStore((state) => state.changeSelected);

    const mutationFunction = async (boardId: string) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/boards`,
                { data: { _id: boardId } }
            );
            return data;
        } catch (error) {
            console.log(error);
            return;
        }
    };
    return useMutation(mutationFunction, {
        onMutate: (variables) => {
            const savedCache = queryClient.getQueryData(["boards"]);
            // get data of boards


            console.log('VARIABLES', variables);
            const boards: Response | undefined = queryClient.getQueryData([
                "boards",
            ]);

            if (
                variables.toString() === selectedBoard._id.toString() &&
                typeof boards !== "undefined"
            ) {

                // reading this I'm seeing how important it is to document your code. If you don't say what you want to do it is really hard
                // for people to understand what you want to do.
                // This is something that you created and you don't understand what you are trying to do.

                let index = 0;

                let newId = boards.data[index]._id;


                if (newId === selectedBoard._id) {
                    if (boards.data.length < 2) {
                        changeSelectedBoard("", "");
                        router.push("/");
                        return;
                    } else {
                        index = 1;
                    }
                }
                changeSelectedBoard(
                    boards.data[index]._id,
                    boards.data[index].title
                );
                router.push(`/boards/${newId}`);
            }

            // this is a fake way to delete the data before deleting it form the real data base. This is to help the user feel like the
            // responsiveness of the app is really fast.

            queryClient.setQueryData(
                ["boards"],
                (prev: Response | undefined): any => {
                    if (prev) {
                        console.log("PREVIEWS", prev);
                        const newData = prev.data.filter(
                            (board: Board) => board._id !== variables
                        );
                        const theNew = {...prev, data: newData};
                        console.log("THIS IS THE INFORMATIONS THAT I'M ADDING", theNew)
                        return theNew;


                    }
                    return;
                }
            );

            // This function that I'm returning is the cache (information that I want to save before there was any change so that if there is a problem)
            // i can set it back to what it was.
            return () => {
                queryClient.setQueryData(["boards"], savedCache);
            };
            // }
        },
        onError: (data, variables, restoreCache) => {
            if (typeof restoreCache !== "undefined") {
                restoreCache();
            }
        },
        onSuccess: (data, variables, restoreCache) => {},

        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries(["boards"]);
        },
    });
};
