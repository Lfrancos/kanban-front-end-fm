import type { NextPage } from "next";

import { Navbar } from "../../components/ui/Navbar";
import { useRouter } from "next/router";
import { useBoardsStore } from "../../store/boardStore";
import { useQueryClient } from '@tanstack/react-query';

const Home: NextPage = () => {
    // const router = useRouter();
    // const queryClient = useQueryClient();
    // const changeSelectedBoard = useBoardsStore(state => state.changeSelected);
    // const boards = queryClient.getQueryData(['boards']);
    return (
        <>
            <Navbar />
        </>
    );
};

export default Home;
