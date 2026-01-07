import { Test, TestingModule } from '@nestjs/testing';
import { InstanceWhatsappController } from './instance_whatsapp.controller';
import { InstanceWhatsappService } from './instance_whatsapp.service';

describe('InstanceWhatsappController', () => {
  let controller: InstanceWhatsappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstanceWhatsappController],
      providers: [InstanceWhatsappService],
    }).compile();

    controller = module.get<InstanceWhatsappController>(InstanceWhatsappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
