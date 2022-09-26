import { combineReducers } from "redux";
import themeSlice from "./themeSlice";

export default combineReducers({
    theme: themeSlice
})