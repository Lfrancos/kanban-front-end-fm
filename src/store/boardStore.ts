import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Board } from '../interfaces';


interface BoardsState {
    boardsMenuOpen: boolean;
    toggleBoardsMenu: () => void;
    selectedBoard: Board;
    changeSelected: (_id: string, title: string) => void;
}

export const useBoardsStore = create<BoardsState>()(
    devtools(
        persist(
            (set) => ({
                boardsMenuOpen: false,
                toggleBoardsMenu: () => set((state) => ({...state, boardsMenuOpen: !state.boardsMenuOpen})),
                selectedBoard: {_id: '', title: '', tasks: []},
                changeSelected: (_id, title) => set((state) => ({...state, selectedBoard : {...state.selectedBoard, _id, title }})),
            }),
            {
                name: "boards",
                //getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
            }
        )
    )
);

