
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetStatuses =  () => {

    const getStatuses = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/jiraStatuses');
            return data;
        } catch (error) {
            console.log(error);
            return
        }
    }

    return useQuery(["statuses"], getStatuses, {
        staleTime: Infinity
    } )
}