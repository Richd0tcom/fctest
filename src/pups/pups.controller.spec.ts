import { Test, TestingModule } from '@nestjs/testing';
import { PupsController } from './pups.controller';
import { PupsService } from './pups.service';

describe('PupsController', () => {
  let controller: PupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PupsController],
      providers: [PupsService],
    }).compile();

    controller = module.get<PupsController>(PupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
