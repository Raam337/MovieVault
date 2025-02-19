import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export { MOVIEDB_ITEMS_PER_RESPONSE } from "@/store/constants"
export { updateDisplayedList, changePage, clearDetailedMovie } from "@/store/movieListSlice"
export { fetchFeaturedMovies, fetchMovieByName, fetchMovieDetails } from "@/store/thunks";