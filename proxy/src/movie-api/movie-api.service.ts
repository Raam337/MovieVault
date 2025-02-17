import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieApiService {
  constructor(
    private readonly httpService: HttpService, 
    private readonly configService: ConfigService
  ) {}

  options = {
    headers: {
      accept: 'application/json',
      Authorization: this.configService.get<string>('MOVIE_API')
    },
    baseURL:"https://api.themoviedb.org/3"
  };

  async checkConnection(){
    const res = await firstValueFrom(
      this.httpService.get('/authentication', this.options)
    ) 
    return res.data
  }

  async getFeaturedMovies(page :number){
    const res = await firstValueFrom(
      this.httpService.get(`/trending/movie/week?language=en-US&page=${page}`,this.options)
    ) 
    return res.data
  }

  async getMoviesByName(name :string, page: number){
    const res = await firstValueFrom(
      this.httpService.get(`/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`,this.options)
    ) 
    return res.data
  }

  async getMovieById(id: number){
    const [res1,res2] = await Promise.all([
      firstValueFrom(this.httpService.get(`/movie/${id}?language=en-US`, this.options)), 
      firstValueFrom(this.httpService.get(`/movie/${id}/images`, this.options)) 
    ])
    return [res1.data, res2.data]
  }

}
