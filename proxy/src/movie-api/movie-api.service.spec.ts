import { Test, TestingModule } from '@nestjs/testing';
import { MovieApiService } from './movie-api.service';

describe('MovieApiService', () => {
  let service: MovieApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieApiService],
    }).compile();

    service = module.get<MovieApiService>(MovieApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
