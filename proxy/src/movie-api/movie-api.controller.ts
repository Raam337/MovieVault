import { Controller, Get, Logger, ParseIntPipe, Query } from '@nestjs/common';
import { MovieApiService } from './movie-api.service';

@Controller('movie-api')
export class MovieApiController {
  constructor(private readonly movieApiService:MovieApiService) {}

  @Get() //movie-api
  checkConnection(){
    return this.movieApiService.checkConnection()
  }

  @Get("featured") //movie-api/featured?page=X
  getFeaturedMovies(@Query("page", ParseIntPipe) page: number){
    return this.movieApiService.getFeaturedMovies(page)
  }

  @Get("movies") //movie-api/movies?name=X&page=N
  getMoviesByName(@Query("name") name: string, @Query("page") page: number){
    return this.movieApiService.getMoviesByName(name,page)
  }

  @Get("movie") //movie-api/movie?id=X
  async getMovieById(@Query("id") id: number){
    const [movieData,imageData] = await this.movieApiService.getMovieById(id)
    movieData.backdrops = imageData.backdrops.slice(-5)

    return movieData
  }
}
