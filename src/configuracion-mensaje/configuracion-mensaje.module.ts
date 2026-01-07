import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionMensaje } from './configracion-mensaje.entity';
import { User } from 'src/User/user.entity';
import { ConfiguracioMensajeService } from './configuracio-mensaje.service';
import { ConfiguracioMensajeController } from './configuracio-mensaje.controller';

@Module({
    imports : [TypeOrmModule.forFeature([ConfiguracionMensaje , User])],
    providers : [ConfiguracioMensajeService],
    controllers : [ConfiguracioMensajeController],
    exports : [ConfiguracioMensajeService]
})
export class ConfiguracionMensajeModule {}
