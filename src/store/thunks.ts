import { createAsyncThunk } from "@reduxjs/toolkit";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_MOVIE_API
  }
};

export const fetchFeaturedMovies = createAsyncThunk(
  "list/fetchFeatured",
  async (endpoint: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${endpoint}`,options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
)