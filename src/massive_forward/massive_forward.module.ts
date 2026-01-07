import { Module } from '@nestjs/common';
import { MassiveForwardService } from './massive_forward.service';
import { MassiveForwardController } from './massive_forward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Massive_Forward } from './entities/massive_forward.entity';
import { InstanceWhatsapp } from 'src/instance_whatsapp/entities/instance_whatsapp.entity';
import { User } from 'src/User/user.entity';
import { QueueListService, QueueSendMessage } from './Queue/Queue';

@Module({
  imports: [TypeOrmModule.forFeature([Massive_Forward , InstanceWhatsapp , User])],
  controllers: [MassiveForwardController],
  providers: [MassiveForwardService , QueueListService , QueueSendMessage],
})
export class MassiveForwardModule {}
