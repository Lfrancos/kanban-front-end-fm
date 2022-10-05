import type { NextPage } from "next";

import { Navbar } from "../components/ui/Navbar";
import { useRouter } from "next/router";
import { useBoardsStore } from "../store/boardStore";

const Home: NextPage = () => {
    const router = useRouter();
    const selectedBoard = useBoardsStore((state) => state.selectedBoard);
    if (typeof window !== "undefined") {
        if (selectedBoard._id) {
            router.push(`/boards/${selectedBoard._id}`);
        }
    }
    return (
        <>
            <Navbar />
        </>
    );
};

export default Home;
