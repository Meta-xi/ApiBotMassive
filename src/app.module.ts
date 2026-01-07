import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/datasource';
import { User } from './User/user.entity';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfiguracionMensajeModule } from './configuracion-mensaje/configuracion-mensaje.module';
import { InstanceWhatsappModule } from './instance_whatsapp/instance_whatsapp.module';
import { MassiveForwardModule } from './massive_forward/massive_forward.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname , '..' , 'public'),
      serveRoot: '/public'
    }),
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    ConfiguracionMensajeModule,
    InstanceWhatsappModule,
    MassiveForwardModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, UserController ],
  providers: [AppService, UserService ],
})
export class AppModule {}
