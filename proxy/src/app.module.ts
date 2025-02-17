import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieApiModule } from './movie-api/movie-api.module';

@Module({
  imports: [MovieApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
