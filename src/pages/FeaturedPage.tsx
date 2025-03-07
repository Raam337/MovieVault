import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { MovieList, Pagination } from "@/components/components";
import { changePage, fetchFeaturedMovies, fetchMovieByName, MOVIEDB_ITEMS_PER_RESPONSE,
  updateDisplayedList, useAppDispatch, useAppSelector,
} from "@/store/storeActions";

import "./featuredPage.sass";

function FeaturedPage() {
  const list = useAppSelector((state) => state.movieList.displayedList);
  const paginationData = useAppSelector((state) => state.movieList.paginationData);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();

  const [search, setSearch] = useState<string>(searchParam.get("search") ?? "");

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchFeaturedMovies());
    } else {
      dispatch(updateDisplayedList());
    }
  }, []);

  useEffect(() => {
    const lastIndex =
      paginationData.displayedPage * paginationData.itemsPerPage;
    const maxIndex = paginationData.responsePage * MOVIEDB_ITEMS_PER_RESPONSE;
    if (
      maxIndex - lastIndex >= MOVIEDB_ITEMS_PER_RESPONSE ||
      lastIndex > maxIndex
    ) {
      const fetchPage = Math.ceil(lastIndex / MOVIEDB_ITEMS_PER_RESPONSE);
      search.length > 0
        ? dispatch(fetchMovieByName({ name: search, page: fetchPage }))
        : dispatch(fetchFeaturedMovies(fetchPage));
    } else {
      dispatch(updateDisplayedList());
    }
  }, [paginationData.displayedPage]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputData = formData.get("search") as string;
    dispatch(changePage(1));

    setSearchParam({ search: inputData });
    if (inputData.length > 0) {
      dispatch(fetchMovieByName({ name: inputData }));
      setSearch(inputData);
    } else {
      dispatch(fetchFeaturedMovies(1));
      setSearchParam({});
      setSearch("");
    }
  }

  return (
    <div className="page">
      <h1 className="page__title">Search for movie by name</h1>
      <form className="page__form" onSubmit={handleSearch}>
        <input className="page__search-bar" type="text" name="search" />
        <button className="page__search-btn" type="submit">
          Search
        </button>
      </form>
      <h2 className="page__header">
        {search ? `Search results for ${search}` : "Featured movies"}
      </h2>
      <MovieList list={list}></MovieList>
      <Pagination
        itemsPerPage={paginationData.itemsPerPage}
        totalItems={paginationData.responseResultsTotal}
      ></Pagination>
    </div>
  );
}

export default FeaturedPage;
