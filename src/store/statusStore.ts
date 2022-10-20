import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StatusState {
    createStatus: boolean;
    toggleCreateStatus: () => void;
}

const useStatusStore = create<StatusState>()(
    devtools(
        persist(
            (set) => ({
                createStatus: false,
                toggleCreateStatus: () => set((state) => ({...state, createStatus: !state.createStatus}) ),
            }),
            {
                name: "Status-storage",
                //getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
            }
        )
    )
);

export default useStatusStore;
