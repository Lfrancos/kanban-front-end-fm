import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Board, BoardToDelete } from '../interfaces';




interface BoardsState {
    boardsMenuOpen: boolean;
    toggleBoardsMenu: () => void;
    selectedBoard: Board;
    changeSelected: (_id: string, title: string) => void;
    boardCreated: boolean;
    toggleBoardCreated: () => void;
    deleteBoard: boolean;
    toggleDeleteBoard: () => void;
    boardToDelete: BoardToDelete;
    changeBoardToDelete: (_id: string, title: string) => void;
}

export const useBoardsStore = create<BoardsState>()(
    devtools(
        persist(
            (set) => ({
                boardsMenuOpen: false,
                toggleBoardsMenu: () => set((state) => ({...state, boardsMenuOpen: !state.boardsMenuOpen})),
                selectedBoard: {_id: '', title: '', statuses: []},
                changeSelected: (_id, title) => set((state) => ({...state, selectedBoard : {...state.selectedBoard, _id, title }})),
                boardCreated: false,
                toggleBoardCreated: () => set((state) => ({...state, boardCreated: !state.boardCreated})),
                deleteBoard: false,
                toggleDeleteBoard: () => set((state) => ({...state, deleteBoard: !state.deleteBoard})),
                boardToDelete: {_id: '', title: ''},
                changeBoardToDelete: (_id,title) => set((state) => ({...state, boardToDelete: {...state.boardToDelete, _id, title} }))
            }),
            {
                name: "boards",
                //getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
            }
        )
    )
);

