import { Test, TestingModule } from '@nestjs/testing';
import { PupsService } from './pups.service';

describe('PupsService', () => {
  let service: PupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PupsService],
    }).compile();

    service = module.get<PupsService>(PupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
