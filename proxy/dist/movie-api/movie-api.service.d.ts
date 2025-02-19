import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MovieApiService {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    options: {
        headers: {
            accept: string;
            Authorization: string | undefined;
        };
        baseURL: string;
    };
    checkConnection(): Promise<any>;
    getFeaturedMovies(page: number): Promise<any>;
    getMoviesByName(name: string, page: number): Promise<any>;
    getMovieById(id: number): Promise<any[]>;
}
