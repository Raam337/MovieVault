import MovieList from "@/components/MovieList/MovieList"
import Pagination from "@/components/Pagination/Pagination"
import { MOVIEDB_ITEMS_PER_RESPONSE } from "@/store/constants"
import { changePage, updateDisplayedList } from "@/store/movieListSlice"
import { AppDispatch, RootState } from "@/store/store"
import { fetchFeaturedMovies, fetchMovieByName } from "@/store/thunks"
import { FormEventHandler, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./featuredPage.sass"

function FeaturedPage() {
  const list = useSelector( (state:RootState) => state.movieList.displayedList)
  const paginationData = useSelector( (state:RootState) => state.movieList.paginationData)

  const [search, setSearch] = useState<string>("")

  const dispatch = useDispatch<AppDispatch>()

  useEffect( ()=>{
    dispatch( fetchFeaturedMovies(1) )
  },[])
    
  useEffect( ()=>{
    const lastIndex = (paginationData.displayedPage) * paginationData.itemsPerPage
    const maxIndex = paginationData.responsePage*MOVIEDB_ITEMS_PER_RESPONSE

    if (maxIndex - lastIndex > MOVIEDB_ITEMS_PER_RESPONSE || lastIndex > maxIndex){
      const fetchPage = Math.ceil(lastIndex/MOVIEDB_ITEMS_PER_RESPONSE)
      search.length > 0 ? dispatch( fetchMovieByName({endpoint:search, page:fetchPage})) : dispatch(fetchFeaturedMovies(fetchPage))
    } else {
      dispatch( updateDisplayedList() )
    }
  },[paginationData.displayedPage])


  function handleSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchData = formData.get("search") as string
    setSearch(searchData);
    dispatch(changePage(1))
    search.length > 0 ? dispatch(fetchMovieByName({endpoint:search})) : dispatch( fetchFeaturedMovies(1) )
  }

  return (
    <div className="page">
      <h1 className="page__form-header">Search for movie by name</h1>
      <form className="page__form" onSubmit={handleSearch}>
        <input type="text" name="search"/>
        <button type="submit">Search</button>
      </form>
      <header className="page__header">{search ? `Search results for ${search}` : "Featured movies" }</header>
      <MovieList list={list}></MovieList>
      <Pagination itemsPerPage={paginationData.itemsPerPage} totalItems={paginationData.responseResultsTotal}></Pagination>
    </div>

  )
}

export default FeaturedPage