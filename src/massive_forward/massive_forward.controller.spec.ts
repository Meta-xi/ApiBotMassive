import { Test, TestingModule } from '@nestjs/testing';
import { MassiveForwardController } from './massive_forward.controller';
import { MassiveForwardService } from './massive_forward.service';

describe('MassiveForwardController', () => {
  let controller: MassiveForwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MassiveForwardController],
      providers: [MassiveForwardService],
    }).compile();

    controller = module.get<MassiveForwardController>(MassiveForwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
