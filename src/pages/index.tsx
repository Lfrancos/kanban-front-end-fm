import type { NextPage } from "next";

import { Navbar } from "../components/ui/Navbar";
import { useHydrated } from "../hooks/useHydrated";
import { Loading } from "../components/Loading";

const Home: NextPage = () => {
    const hydrated = useHydrated();
    if (!hydrated) return <Loading />;

    return (
        <>
            <Navbar />
        </>
    );
};

export default Home;
