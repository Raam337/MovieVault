import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchFeaturedMovies, fetchMovieByName } from './thunks'
import { Movie } from '@/types/Movie'
import { MOVIEDB_ITEMS_PER_RESPONSE } from './constants'

export interface MovieList {
  responseList: Array<Movie>,
  displayedList: Array<Movie>,
  isLoading: boolean,
  error: string,
  paginationData: {
    responsePage: number,
    displayedPage: number,
    itemsPerPage: number,
    responsePageTotal: number,
    responseResultsTotal: number
  }
}

const initialState: MovieList = {
  responseList: [],
  displayedList: [],
  isLoading: false,
  error: "",
  paginationData:{
    responsePage: 1,
    displayedPage: 1,
    itemsPerPage: 10,
    responsePageTotal: 0,
    responseResultsTotal: 0
  }
}

function updateList(state: MovieList){
  const ipp = state.paginationData.itemsPerPage //Items per page

  const lastIndex = (state.paginationData.displayedPage) * ipp
  const maxIndex = (state.paginationData.responsePage) * MOVIEDB_ITEMS_PER_RESPONSE

  const start = Math.floor(lastIndex/maxIndex)*ipp

  return state.responseList.slice(start,start + ipp)
}

export const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    updateDisplayedList: (state) => {
      state.displayedList = updateList(state)
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.paginationData.displayedPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    //Featured movies
      .addCase(fetchFeaturedMovies.pending, (state) =>{
        state.isLoading = true
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        console.log(action);
        state.responseList = action.payload.results
        state.paginationData.responsePage = action.payload.page
        state.paginationData.responsePageTotal = action.payload.total_pages
        state.paginationData.responseResultsTotal = action.payload.total_results
        state.displayedList = updateList(state)
        state.isLoading = false
      })
      .addCase(fetchFeaturedMovies.rejected, (_state)=>{
        console.log("Failed to fetch");
      })
    //Search by name
      .addCase(fetchMovieByName.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(fetchMovieByName.fulfilled, (state, action)=>{
        state.responseList = action.payload.results
        state.paginationData.responsePage = action.payload.page
        state.paginationData.responsePageTotal = action.payload.total_pages
        state.paginationData.responseResultsTotal = action.payload.total_results
        state.displayedList = updateList(state)
        state.isLoading = false
      })
  }
  ,
})


export const { updateDisplayedList, changePage } = movieListSlice.actions

export default movieListSlice.reducer