import { AppDispatch, RootState } from "@/store/store";
import { fetchMovieDetails } from "@/store/thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./moviePage.sass";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { clearDetailedMovie } from "@/store/movieListSlice";
import { DetailedMovie } from "@/types/Movie";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ImageSkeleton from "@/components/Skeleton/ImageSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ErrorBanner from "@/components/ErrorBanner/ErrorBanner";

function MoviePage() {
  const [urlParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const movieData = useAppSelector(state => state.movieList.detailedMovie);
  const error = useAppSelector(state => state.movieList.error);

  useEffect(() => {
    dispatch(fetchMovieDetails(urlParams.get("id")!));
  }, [urlParams]);

  useEffect( ()=>{
    return ()=> {
      dispatch( clearDetailedMovie())
    }
  },[])

  const parameters = [
    { label: "Original title:", property: "original_title" },
    { label: "Overview:", property: "overview" },
    { label: "Tag:", property: "tagline" },
    { label: "Release date:", property: "release_date" },
    { label: "Language:", property: "original_language" },
    { label: "Rating:", property: "vote_average" },
    { label: "Genres:", property: "genres" },
    { label: "Produced by:", property: "production_companies" },
    { label: "Produced in:", property: "production_countries" },
    { label: "Homepage:", property: "homepage" },
    { label: "IMDB ID:", property: "imdb_id" }
  ];
  

  return (
    <>
    {error ? <ErrorBanner>{error}</ErrorBanner> :
      <main className="detailPage">
        <button className="detailPage__back-button" onClick={()=> history.back()}>Back</button>
        <Splide className="detailPage__carousel" options={ { rewind: true } }>
          <SplideSlide>
            <ImageSkeleton url={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`} />
          </SplideSlide>

          {movieData?.backdrops.map((backdrop,i) => {
            return (
              <SplideSlide key={"Backdrop " + i + 1}>
                <ImageSkeleton url={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                />
              </SplideSlide>
            );
          })}
        </Splide>
        
        <section className="detailPage__infoList">
          <h2>{movieData?.title}</h2>

          {parameters.map( ({label,property},index) => {
            let entry = movieData?.[property as keyof DetailedMovie]

            if( Array.isArray(entry) ){
              entry = entry.map((item) => item.name).join(", ")
            }

            if ( (label === "Language:" || label === "IMDB ID:") && typeof entry === "string" ){
              entry = entry.toUpperCase()
            }

            if ( !entry && movieData){
              entry = "-"
            }
            return(
              <span className="detailPage__infoLine" key={index}>
                <div className="detailPage__infoLine--highlight">{label}</div>
                <div>{entry || <Skeleton />}</div>
              </span>
              

            )
          } )}

        </section>
      </main>
    }
    </>
  );
}

export default MoviePage;
