import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchFeaturedMovies } from './thunks'



export interface CounterState {
  list: Array<any>
}

const initialState: CounterState = {
  list: [],
}



export const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload)
    },
    clearList: (state) => {
      state.list = []
    },
    fetchFeatured: (state) => {
      state.list = ["apple", "sky", "ocean", "mountain", "river", "forest", "cloud", "storm", "fire", "stone"]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        console.log(action.payload)
        state.list = action.payload.results
      })
  }
  ,
})


export const { addToList, clearList, fetchFeatured } = movieListSlice.actions

export default movieListSlice.reducer