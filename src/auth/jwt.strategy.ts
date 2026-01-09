import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy  } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
      Logger.log(configService.get<string>('JWT_SECRET'))
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_SECRET'),
        });
      }
    async validate(payload : any){
        return {userId : payload.sub , username : payload.username };
    }
}