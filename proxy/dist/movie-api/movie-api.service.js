"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
let MovieApiService = class MovieApiService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.options = {
            headers: {
                accept: 'application/json',
                Authorization: this.configService.get('MOVIE_API')
            },
            baseURL: "https://api.themoviedb.org/3"
        };
    }
    async checkConnection() {
        const res = await (0, rxjs_1.firstValueFrom)(this.httpService.get('/authentication', this.options));
        return res.data;
    }
    async getFeaturedMovies(page) {
        const res = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`/trending/movie/week?language=en-US&page=${page}`, this.options));
        return res.data;
    }
    async getMoviesByName(name, page) {
        const res = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`, this.options));
        return res.data;
    }
    async getMovieById(id) {
        const [res1, res2] = await Promise.all([
            (0, rxjs_1.firstValueFrom)(this.httpService.get(`/movie/${id}?language=en-US`, this.options)),
            (0, rxjs_1.firstValueFrom)(this.httpService.get(`/movie/${id}/images`, this.options))
        ]);
        return [res1.data, res2.data];
    }
};
exports.MovieApiService = MovieApiService;
exports.MovieApiService = MovieApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MovieApiService);
//# sourceMappingURL=movie-api.service.js.map