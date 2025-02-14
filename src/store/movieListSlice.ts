import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchFeaturedMovies } from './thunks'
import { Movie } from '@/types/Movie'
import { MOVIEDB_ITEMS_PER_RESPONSE } from './constants'

export interface MovieList {
  responseList: Array<Movie>,
  displayedList: Array<Movie>,
  isLoading: boolean,
  paginationData: {
    responsePage: number,
    displayedPage: number,
    itemsPerPage: number
  }
}

const initialState: MovieList = {
  responseList: [],
  displayedList: [],
  isLoading: false,
  paginationData:{
    responsePage: 1,
    displayedPage: 1,
    itemsPerPage: 10
  }
}

export const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    updateDisplayedList: (state) => {
      const ipp = state.paginationData.itemsPerPage //Items per page

      const lastIndex = (state.paginationData.displayedPage) * ipp
      const maxIndex = (state.paginationData.responsePage) * MOVIEDB_ITEMS_PER_RESPONSE

      const start = Math.floor(lastIndex/maxIndex)*ipp

      state.displayedList = state.responseList.slice(start,start + ipp)
      console.log("Displayed list updated:", state.displayedList);
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.paginationData.displayedPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedMovies.pending, (state) =>{
        state.isLoading = true
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        //console.log("Featured Movies: ", action.payload)
        state.responseList = action.payload.results
        state.paginationData.responsePage = action.payload.page
        movieListSlice.caseReducers.updateDisplayedList(state)
        state.isLoading = false
      })
  }
  ,
})


export const { updateDisplayedList, changePage } = movieListSlice.actions

export default movieListSlice.reducer