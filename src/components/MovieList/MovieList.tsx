import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./movieList.sass";
import { Movie } from "@/types/Movie";

function MovieList( {list}:{list:Movie[]} ) {
  const isLoading = useSelector( (state:RootState) => state.movieList.isLoading)
  
  return (
    <div className="grid">
      <header>
        <p>Name</p>
        <p>Language</p>
        <p>Genre</p>
        <p>Release date</p>
      </header>
      {!isLoading && list.map((item:Movie) => (
         <MovieCard key={item.id} movie={item} />
      ))}

      {isLoading && <div className="placeholder"></div>}
    </div>
  );
}

export default MovieList;
