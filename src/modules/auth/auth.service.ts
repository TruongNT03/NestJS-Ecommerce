import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { UserService } from '../user/user.service';
import { MailService } from '../shared/mail/mail.service';
import { generateOTP } from 'src/common/utils/otp-generate.util';
import { RedisService } from '../shared/redis/redis.service';
import { v4 } from 'uuid';
import { VerifyRegisterDto } from './dto/verify-register.dto';
import { comparePassword, hassingPassword } from 'src/common/utils/hash.util';
import { RegisterRedisValueDto } from './dto/register-redis-value.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginDto } from './dto/login.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
    // private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const { email, password } = dto;
    const token = v4();
    const redisKey = this.redisService.getRegisterKey(token);
    const OTP = generateOTP();
    const hassPassword = hassingPassword(password);
    await this.redisService.setValue<RegisterRedisValueDto>(
      redisKey,
      { email, password: hassPassword, OTP },
      300,
    );
    await this.mailService.sendMail(OTP, dto.email);
    return {
      success: true,
      token,
    };
  }

  async verifyRegister(
    dto: VerifyRegisterDto,
    token: string,
  ): Promise<SuccessReponseDto> {
    const redisKey = this.redisService.getRegisterKey(token);
    const redisValue =
      await this.redisService.getValue<RegisterRedisValueDto>(redisKey);
    if (!redisValue) {
      throw new ServerException(ERROR_RESPONSE.BAD_REQUEST);
    }
    if (dto.OTP !== redisValue.OTP) {
      throw new ServerException(ERROR_RESPONSE.OTP_INVALID);
    }
    await this.redisService.deleteKey(redisKey);
    return await this.userService.create({
      email: redisValue.email,
      password: redisValue.password,
    });
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findOneByEmail(email);
    if (!user || comparePassword(user.password, password)) {
      throw new ServerException(ERROR_RESPONSE.INCREDENTIAL);
    }
  }

  async generateToken() {}
}
