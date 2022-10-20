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

    // this is the return

    return useMutation(mutationFunction, {
        onMutate: (variables) => {
            const savedCache = queryClient.getQueryData(["boards"]);

            queryClient.setQueriesData(["boards"], (prev: any) => {
                console.log("THIS IS THE PREVIEWS", prev )
                return {
                    ...prev,
                    data: [...prev.data,
                        {
                            _id: "1324",
                            title: variables.title.toLowerCase(),
                            statuses: [],
                        }
                    ]
                }
                // return [
                //     ...prev,
                //     {
                //         _id: "1324",
                //         title: variables.title.toLowerCase(),
                //         statuses: [],
                //     },
                // ];
            });
            return () => {
                queryClient.setQueryData(["boards"], savedCache);
            };
        },
        // onSuccess: (data, variables, restoreCache) => {
        //     if (typeof restoreCache !== "undefined") {
        //         restoreCache();
        //     }

        //     const newBoard = {
        //         _id: data.upsertedId,
        //         title: variables.title,
        //         statuses: [],
        //     };

        //     router.push(`/boards/${data.upsertedId}`);

        //     changeBoardSelected(data.upsertedId, variables.title);

        //     queryClient.setQueryData(["boards"], (prev: any) => {
        //         if (typeof prev !== "undefined") {
        //             return {...prev, data: [...prev.data, newBoard]}
        //             // return [...prev, newBoard];
        //         }
        //     });
        // },
        onError: (data, variables, restoreCache) => {
            if (typeof restoreCache !== "undefined") {
                restoreCache();
            }
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries(["boards"]);
        },
    });
};
