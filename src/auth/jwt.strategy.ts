import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy  } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
      Logger.log(process.env.JWT_SECRET)
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: "LQd9kEn/2U8y+lQm+ZR8bzJnRbk/o44QzFvV7sZ9kI8bYzwE/2jdEZcM+Nk/90Rb",
        });
      }
    async validate(payload : any){
        return {userId : payload.sub , username : payload.username };
    }
}