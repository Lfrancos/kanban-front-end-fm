import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardsStore } from "../store/boardStore";
import { useRouter } from "next/router";
import axios from "axios";
import { Board } from '../interfaces/index';

export const usePostBoard = () => {
    const queryClient = useQueryClient();

    const toggleBoardsMenu = useBoardsStore((state) => state.toggleBoardsMenu);
    const changeBoardSelected = useBoardsStore((state) => state.changeSelected);
    const router = useRouter();

    const mutationFunction = async (newData: any) => {
        try {
            const { data } = await axios.post(
                `http://localhost:5000/boards`,
                newData
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

            queryClient.setQueriesData(["boards"], (prev: any) => {
                return [
                    ...prev,
                    {
                        _id: "1324",
                        title: variables.title.toLowerCase(),
                        tasks: [],
                    },
                ];
            });
            return () => {
                queryClient.setQueryData(["boards"], savedCache);
            };
        },
        onSuccess: (data, variables, restoreCache) => {
            console.log("This is the DATA of onSuccess", data);
            console.log("This is the variables of onSuccess", variables);
            if (typeof restoreCache !== "undefined") {
                restoreCache();
            }
            const newBoard = {
                _id: data.upsertedId,
                title: variables.title,
                tasks: [],
            };
            router.push(`/boards/${data.upsertedId}`);
            changeBoardSelected(data.upsertedId, variables.title);
            queryClient.setQueryData(["boards"], (prev: any) => {
                if (typeof prev !== "undefined") {
                    return [...prev, newBoard];
                }
            });
        },
        onError: (data, variables, restoreCache) => {
            console.log("onError data:", data);
            console.log("onError Variables:", variables);
            if (typeof restoreCache !== "undefined") {
                restoreCache();
            }
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries(["boards"]);
        },
    });
};
