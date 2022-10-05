import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useBoardsStore } from "../store/boardStore";
import { Board } from "./../interfaces";

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

            const boards: Board[] | undefined = queryClient.getQueryData([
                "boards",
            ]);

            if (
                variables.toString() === selectedBoard._id.toString() &&
                typeof boards !== "undefined"
            ) {
                console.log("these are the SAME!!!");
                let selectedId = 0
                let newId = boards[selectedId]._id;
                if (newId === selectedBoard._id) {
                    console.log("it is the first one")
                    if (boards.length < 2) {
                        changeSelectedBoard('', '');
                        router.push('/');
                        return
                    } else {
                        selectedId = 1
                    }
                }
                changeSelectedBoard(boards[selectedId]._id, boards[selectedId].title);
                console.log("This is the NEW ID:", newId);
                router.push(`/boards/${newId}`);
            }

            console.log(
                "these are the boards after seeing if they are the same",
                boards
            );
            // this is a fake way to delete the data before deleting it form the real data base. This is to help the user feel like the
            // responsiveness of the app is really fast.

            queryClient.setQueryData(
                ["boards"],
                (prev: Board[] | undefined): Board[] | undefined => {
                    if (prev) {
                        return prev.filter(
                            (board: Board) => board._id !== variables
                        );
                    }
                    return;
                }
            );
            return () => {
                queryClient.setQueryData(["boards"], savedCache);
            };
            // }
        },
        onError: (data, variables, restoreCache) => {
            console.log("onError Data:", data);
            console.log("onError Variables:", variables);
            console.log('THERE WAS AN ERROR!!!!!!!!!!!!!!');
            router.push(`/boars/${selectedBoard}`);
            if (typeof restoreCache !== 'undefined') {
                restoreCache();
            }
        },
        onSuccess: (data, variables, restoreCache) => {
            console.log("onSuccess Data:", data);
            console.log("onSuccess Variables:", variables);
        },

        onSettled: (data, error, variables) => {
            // console.log("onSettled Variables:", variables);
            queryClient.invalidateQueries(["boards"]);
        },
    });
};
