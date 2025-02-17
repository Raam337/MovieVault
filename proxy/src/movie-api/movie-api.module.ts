import { Module } from '@nestjs/common';
import { MovieApiController } from './movie-api.controller';
import { MovieApiService } from './movie-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[HttpModule, ConfigModule.forRoot()],
  controllers: [MovieApiController],
  providers: [MovieApiService]
})
export class MovieApiModule {}
