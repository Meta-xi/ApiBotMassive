import { Test, TestingModule } from '@nestjs/testing';
import { MassiveForwardService } from './massive_forward.service';

describe('MassiveForwardService', () => {
  let service: MassiveForwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MassiveForwardService],
    }).compile();

    service = module.get<MassiveForwardService>(MassiveForwardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
