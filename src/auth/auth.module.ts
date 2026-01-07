import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule , ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService , JwtStrategy],
  imports: [PassportModule,
    JwtModule.registerAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (ConfigService : ConfigService) => ({
        secret : ConfigService.get<string>('JWT_SECRET'),
        signOptions : {
          expiresIn : '24h'
        }
      }),
    }),
    ConfigModule.forRoot(),
  ],
  exports: [AuthService]
})
export class AuthModule {}
