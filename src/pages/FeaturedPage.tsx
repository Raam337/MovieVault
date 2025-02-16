import MovieList from "@/components/MovieList/MovieList"
import Pagination from "@/components/Pagination/Pagination"
import { MOVIEDB_ITEMS_PER_RESPONSE } from "@/store/constants"
import { changePage, updateDisplayedList } from "@/store/movieListSlice"
import { AppDispatch, RootState } from "@/store/store"
import { fetchFeaturedMovies, fetchMovieByName } from "@/store/thunks"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./featuredPage.sass"
import { useSearchParams } from "react-router-dom"

function FeaturedPage() {
  const list = useSelector( (state:RootState) => state.movieList.displayedList)
  const paginationData = useSelector( (state:RootState) => state.movieList.paginationData)
  const dispatch = useDispatch<AppDispatch>()
  const [searchParam,setSearchParam] = useSearchParams()

  const [search, setSearch] = useState<string>(searchParam.get("search")?? "")


  useEffect( ()=>{
    if( list.length === 0){
      dispatch( fetchFeaturedMovies(1) )
    } else {
      dispatch( updateDisplayedList())
    }
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
    const inputData = formData.get("search") as string
    dispatch(changePage(1))

    setSearchParam({search: inputData})
    if (inputData.length > 0){
      dispatch(fetchMovieByName({endpoint:inputData}))
      setSearch(inputData)
     } else {
      dispatch( fetchFeaturedMovies(1) )
      setSearchParam({})
      setSearch("")
     } 
  }

  return (
    <div className="page">
      <h1>Search for movie by name</h1>
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