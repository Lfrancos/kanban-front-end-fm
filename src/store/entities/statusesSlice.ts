import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface JiraStatus {
    _id: string;
    name: string;
}
interface Payload {
    name: string;
}

// const initialState: JiraStatus[] = [
//     { _id: uuidv4(), name: "pending" },
//     { _id: uuidv4(), name: "in-progress" },
// ];
const initialState: string[] = [
    "pending" ,
    "in-progress" ,
];


const statusesSlice = createSlice({
    name: "statuses",
    initialState,
    reducers: {
        addStatus:  (statuses, action: PayloadAction<Payload>) => {
            // const {data} = await
            statuses.push(action.payload.name);
        },
        removeStatus: (statuses, action: PayloadAction<JiraStatus>) => {
            // statuses.filter((status) => status._id !== action.payload._id);
            statuses.filter((status) => status !== action.payload.name);
        },
    },
});

export const { addStatus, removeStatus } = statusesSlice.actions;

export default statusesSlice.reducer;
