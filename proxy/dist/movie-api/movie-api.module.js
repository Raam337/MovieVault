"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieApiModule = void 0;
const common_1 = require("@nestjs/common");
const movie_api_controller_1 = require("./movie-api.controller");
const movie_api_service_1 = require("./movie-api.service");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let MovieApiModule = class MovieApiModule {
};
exports.MovieApiModule = MovieApiModule;
exports.MovieApiModule = MovieApiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule.forRoot()],
        controllers: [movie_api_controller_1.MovieApiController],
        providers: [movie_api_service_1.MovieApiService]
    })
], MovieApiModule);
//# sourceMappingURL=movie-api.module.js.map