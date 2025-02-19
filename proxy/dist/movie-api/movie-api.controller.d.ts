import { MovieApiService } from './movie-api.service';
export declare class MovieApiController {
    private readonly movieApiService;
    constructor(movieApiService: MovieApiService);
    checkConnection(): Promise<any>;
    getFeaturedMovies(page: number): Promise<any>;
    getMoviesByName(name: string, page: number): Promise<any>;
    getMovieById(id: number): Promise<any>;
}
