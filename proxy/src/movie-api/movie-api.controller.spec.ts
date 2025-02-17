import { Test, TestingModule } from '@nestjs/testing';
import { MovieApiController } from './movie-api.controller';

describe('MovieApiController', () => {
  let controller: MovieApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieApiController],
    }).compile();

    controller = module.get<MovieApiController>(MovieApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
