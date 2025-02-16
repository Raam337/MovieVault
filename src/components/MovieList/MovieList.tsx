import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./movieList.sass";
import { Movie } from "@/types/Movie";
import Skeleton from "react-loading-skeleton";

function MovieList( {list}:{list:Movie[]} ) {
  const isLoading = useSelector( (state:RootState) => state.movieList.isLoading)
  
  return (
    <div className="movieList">
      <header className="movieList__header">
        <p>Name</p>
        <p>Language</p>
        <p>Genre</p>
        <p>Release date</p>
      </header>
      {!isLoading && list.map((item:Movie) => (
         <MovieCard key={item.id} movie={item} />
      ))}

      {isLoading && <Skeleton className="movieList__placeholder"/>}
    </div>
  );
}

export default MovieList;
