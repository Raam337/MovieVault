import MovieList from "@/components/MovieList/MovieList"
import Pagination from "@/components/Pagination/Pagination"
import { MOVIEDB_ITEMS_PER_RESPONSE } from "@/store/constants"
import { changePage, updateDisplayedList } from "@/store/movieListSlice"
import { RootState } from "@/store/store"
import { fetchFeaturedMovies } from "@/store/thunks"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function FeaturedPage() {
  const list = useSelector( (state:RootState) => state.movieList.displayedList)

  const paginationData = useSelector( (state:RootState) => state.movieList.paginationData)
  const st = useSelector( (state:RootState) => state.movieList)
  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch( fetchFeaturedMovies(1) )
    dispatch( updateDisplayedList())
  },[] )
    
  useEffect( ()=>{
    console.log("paginationData changed");
    const lastIndex = (paginationData.displayedPage) * paginationData.itemsPerPage
    const maxIndex = paginationData.responsePage*MOVIEDB_ITEMS_PER_RESPONSE

    if (maxIndex - lastIndex > MOVIEDB_ITEMS_PER_RESPONSE || lastIndex > maxIndex){
      const fetchPage = Math.ceil(lastIndex/MOVIEDB_ITEMS_PER_RESPONSE)
      dispatch( fetchFeaturedMovies(fetchPage) )
    } else {
      console.log(st);
      dispatch( updateDisplayedList() )
    }
  },[paginationData])

  function paginate(index:number){
    dispatch( changePage(index) )
  }

  return (
    <>
      <div>FeaturedPage</div>
      <MovieList list={list}></MovieList>
      <Pagination itemsPerPage={paginationData.itemsPerPage} totalItems={105} paginate={paginate}></Pagination>
    </>

  )
}

export default FeaturedPage