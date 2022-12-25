import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'

const reducer = {
  user: userReducer,
}

export const store = configureStore({ reducer, devTools: process.env.NODE_ENV === 'development' })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch