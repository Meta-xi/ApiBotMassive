import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracioMensajeService } from './configuracio-mensaje.service';

describe('ConfiguracioMensajeService', () => {
  let service: ConfiguracioMensajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfiguracioMensajeService],
    }).compile();

    service = module.get<ConfiguracioMensajeService>(ConfiguracioMensajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
