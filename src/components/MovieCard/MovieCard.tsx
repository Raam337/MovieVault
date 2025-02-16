import { Movie } from "@/types/Movie"
import "./movieCard.sass"
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie
}

const genres : { [key : number]:string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};


function MovieCard( { movie } : MovieCardProps ) {
  const navigate = useNavigate()
  return (
    <section className="movieCard" onClick={() => navigate(`/movie?id=${movie.id}`)}>
      <div>{movie.title}</div>
      <div>{movie.original_language?.toUpperCase()}</div>
      <div className="genreList">
        {movie.genre_ids?.length ? movie.genre_ids?.map( (id:number) => genres[id] ).join(", ") : "-"}
      </div>
      <div>{movie.release_date}</div>
    </section>
  )
}

export default MovieCard