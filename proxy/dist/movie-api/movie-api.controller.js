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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieApiController = void 0;
const common_1 = require("@nestjs/common");
const movie_api_service_1 = require("./movie-api.service");
let MovieApiController = class MovieApiController {
    constructor(movieApiService) {
        this.movieApiService = movieApiService;
    }
    checkConnection() {
        return this.movieApiService.checkConnection();
    }
    getFeaturedMovies(page) {
        return this.movieApiService.getFeaturedMovies(page);
    }
    getMoviesByName(name, page) {
        return this.movieApiService.getMoviesByName(name, page);
    }
    async getMovieById(id) {
        const [movieData, imageData] = await this.movieApiService.getMovieById(id);
        movieData.backdrops = imageData.backdrops.slice(-5);
        return movieData;
    }
};
exports.MovieApiController = MovieApiController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieApiController.prototype, "checkConnection", null);
__decorate([
    (0, common_1.Get)("featured"),
    __param(0, (0, common_1.Query)("page", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovieApiController.prototype, "getFeaturedMovies", null);
__decorate([
    (0, common_1.Get)("movies"),
    __param(0, (0, common_1.Query)("name")),
    __param(1, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], MovieApiController.prototype, "getMoviesByName", null);
__decorate([
    (0, common_1.Get)("movie"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieApiController.prototype, "getMovieById", null);
exports.MovieApiController = MovieApiController = __decorate([
    (0, common_1.Controller)('movie-api'),
    __metadata("design:paramtypes", [movie_api_service_1.MovieApiService])
], MovieApiController);
//# sourceMappingURL=movie-api.controller.js.map