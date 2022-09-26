import { combineReducers } from "redux";

import statusesSlice from "./statusesSlice";

export default combineReducers({
    statuses: statusesSlice
})