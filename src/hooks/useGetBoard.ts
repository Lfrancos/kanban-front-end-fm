import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export const useGetBoard = (boardId: string) => {
    const getBoard = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/boards/${boardId}`
            );
            return data;
        } catch (error) {
            console.log(error);
            return;
        }
    };
    return useQuery(["boards", boardId], getBoard);
};