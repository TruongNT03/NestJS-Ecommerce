import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../auth.constants';
import { JwtPayload, TokenType, UserRequestPayload } from '../auth.interface';
import { RedisService } from 'src/modules/shared/redis/redis.service';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload): Promise<UserRequestPayload> {
    const { id, email, jti, roles, type } = payload;
    if (type !== TokenType.ACCESS_TOKEN) {
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);
    }
    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    const isValidToken = await this.redisService.getValue(userTokenKey);
    if (!isValidToken) {
      throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    }

    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    return {
      id,
      email,
      jti,
      roles,
    };
  }
}
