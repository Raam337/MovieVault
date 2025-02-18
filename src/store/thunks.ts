import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create(
  {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_MOVIE_API
    },
    baseURL: "http://localhost:3000/movie-api"
  }
)

export const fetchFeaturedMovies = createAsyncThunk(
  "list/fetchFeatured",
  async (page:number = 1) => {
    return api
      .get(`/featured?page=${page}`)
      .then( res => res.data)
      .catch( err => err )
  }
)

export const fetchMovieByName = createAsyncThunk(
  "list/fetchByName",
  async ({name, page = 1}:{name: string, page?: number}) => {
    return api
      .get(`/movies?name=${name}&page=${page}`)
      .then( res => res.data)
      .catch( err => err )    
  }
)

export const fetchMovieDetails = createAsyncThunk(
  "list/fetchById",
  async (id : number | string) => {
    return api 
      .get(`/movie?id=${id}`)
      .then( res => res.data)
      .catch( err => {throw err} )
  }
)