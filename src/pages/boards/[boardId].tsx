import type { NextPage } from "next";

import { Navbar } from "../../components/ui/Navbar";
import { useRouter } from "next/router";
import { useGetBoard } from "../../hooks/useGetBoard";
import { useState, useEffect } from 'react';
import { useBoardsStore } from '../../store/boardStore';
import { useHydrated } from '../../hooks/useHydrated';

const BoardId: NextPage = () => {

    const hydrated = useHydrated();
    const router = useRouter();
    const selectedBoard = useBoardsStore(state => state.selectedBoard);
    const id = selectedBoard._id
    const boardQuery = useGetBoard(id) ;

    if (!hydrated) return <p>loading </p>

    if (typeof window !== 'undefined') {

        if (selectedBoard._id) {
        } else {
            // console.log('this should be not runnig....')
            router.push('/')
        }
        // console.log("these is the id that you need to render the page", id)

        // console.log("IS IT REFETCHING", boardQuery.isFetching)
    }


    return (
        <div>
            <>
                <Navbar />
                {/* { boardQuery.isLoading  ? (
                    <p>Board loading...</p>
                ) :  boardQuery.data[0].tasks.length < 1 ? (
                    <p>You have no statuses, create one to get started</p>
                    ) : (
                    <p>tasks</p>
                )} */}
            </>
        </div>
    );

}

export default BoardId;
