import { combineReducers, configureStore } from '@reduxjs/toolkit'
import movieListReducer from "@/store/movieListSlice"

const rootReducer = combineReducers({
  movieList: movieListReducer
})

export function setupStore(preloadedState? : Partial<RootState>){
  return configureStore({
      reducer: rootReducer,
      preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]