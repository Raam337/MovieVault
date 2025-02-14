import { addToList } from "@/store/movieListSlice";
import { fetchFeaturedMovies } from "@/store/thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./movieList.sass";
import { Movie } from "@/types/Movie";

function MovieList() {
  const list = useSelector((state) => state.movieList.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeaturedMovies("2"));
    dispatch(addToList("Aurora"));
  }, []);

  return (
    <div className="grid">
      <header>
        <p>Name</p>
        <p>Language</p>
        <p>Genre</p>
        <p>Release date</p>
      </header>
      {list.map((item:Movie) => (
        <MovieCard movie={item} />
      ))}
    </div>
  );
}

export default MovieList;
