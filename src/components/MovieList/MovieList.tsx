import Skeleton from "react-loading-skeleton";

import { MovieCard } from "@/components/components";
import { Movie } from "@/types/Movie";
import { useAppSelector } from "@/store/storeActions";

import "./movieList.sass";

function MovieList({ list }: { list: Movie[] }) {
  
  const isLoading = useAppSelector((state) => state.movieList.isLoading);

  return (
    <div className="movieList">
      <header className="movieList__header">
        <p>Name</p>
        <p>Language</p>
        <p>Genre</p>
        <p>Release date</p>
      </header>
      {!isLoading &&
        list.map((item: Movie) => <MovieCard key={item.id} movie={item} />)}

      {isLoading && (
        <Skeleton data-testid="skeleton" className="movieList__placeholder" />
      )}
    </div>
  );
}

export default MovieList;
