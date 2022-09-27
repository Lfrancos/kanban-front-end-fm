import create from "zustand";

import { ThemeSlice } from "./ui/themeSlice"; //This is the interface
import themeSlice from './ui/themeSlice'; //this is the slice

type Store = ThemeSlice; //here you need to add all the interfaces that you are adding to the store.


const useStore = create<Store>()( (...a) => {
    return {
            ...themeSlice(...a)
}
}

);
export default useStore;
