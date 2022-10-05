import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



export const useGetBoards = () => {
    const getBoards = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/boards`);
            return data;
        } catch (error) {
            return;
        }
    };
    return useQuery(["boards"], getBoards);
};