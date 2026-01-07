import { Test, TestingModule } from '@nestjs/testing';
import { InstanceWhatsappService } from './instance_whatsapp.service';

describe('InstanceWhatsappService', () => {
  let service: InstanceWhatsappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstanceWhatsappService],
    }).compile();

    service = module.get<InstanceWhatsappService>(InstanceWhatsappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
