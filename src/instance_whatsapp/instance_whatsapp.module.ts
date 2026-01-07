import { Module } from '@nestjs/common';
import { InstanceWhatsappService } from './instance_whatsapp.service';
import { InstanceWhatsappController } from './instance_whatsapp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceWhatsapp } from './entities/instance_whatsapp.entity';
import { User } from 'src/User/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceWhatsapp , User])] ,
  controllers: [InstanceWhatsappController],
  providers: [InstanceWhatsappService],
  exports: [InstanceWhatsappService]
})
export class InstanceWhatsappModule {}
