import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "./imageSkeleton.sass"
import { useAppSelector } from "@/store/hooks";

export default function ImageSkeleton({ url }: { url: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const storeLoading = useAppSelector(state => state.movieList.isLoading);

  return (
    <div className="container">
      {!(imageLoaded === true && storeLoading === false) && <Skeleton className="container__skeleton" />}
      <img
        src={url}
        onLoad={() => {setImageLoaded(true)}}
        style = {{ display: (imageLoaded === true && storeLoading === false)? "block" : "none" }}
        className="container__image"
      />
    </div>
  );
}
