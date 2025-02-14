import { configureStore } from '@reduxjs/toolkit'
import movieListReducer from "@/store/movieListSlice"

export const store = configureStore({
  reducer: {
    movieList: movieListReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch