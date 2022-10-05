import type { NextPage } from "next";

import { Navbar } from "../components/ui/Navbar";
import { useRouter } from "next/router";
import { useBoardsStore } from "../store/boardStore";
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useGetBoards } from '../hooks/useGetBoards';

const Home: NextPage = () => {
    return (
        <>
            <Navbar />
        </>
    );
};

export default Home;
