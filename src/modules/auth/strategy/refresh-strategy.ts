import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../auth.constants';
import { JwtPayload, TokenType, UserRequestPayload } from '../auth.interface';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { RedisService } from 'src/modules/shared/redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload): Promise<UserRequestPayload> {
    const { id, email, jti, role, type } = payload;
    if (type !== TokenType.REFRESH_TOKEN) {
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);
    }

    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    const isValidToken = this.redisService.getValue(userTokenKey);
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
      role,
    };
  }
}
