import { configureStore } from '@reduxjs/toolkit'

import ui from './ui';
import entities from './entities';
import errorMiddleware from './middleware/errorMiddleware';

export const store = configureStore({
    reducer: {
        ui,
        entities
    },
    middleware: [
        errorMiddleware
    ]
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch