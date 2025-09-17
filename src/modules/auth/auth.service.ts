import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/request/register.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { MailService } from '../shared/mail/mail.service';
import { generateOTP } from 'src/common/utils/otp-generate.util';
import { RedisService } from '../shared/redis/redis.service';
import { v4 } from 'uuid';
import { VerifyRegisterDto } from './dto/request/verify-register.dto';
import { comparePassword, hassingPassword } from 'src/common/utils/hash.util';
import { RegisterRedisValueDto } from './dto/request/register-redis-value.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginDto } from './dto/request/login.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenType, UserRequestPayload } from './auth.interface';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { convertDatePatternToSecond } from '../../common/utils/convert-date-pattern-to-minisecond.util';
import * as _ from 'lodash';
import { RefreshTokenResponseDto } from './dto/response/refresh-token-response.dto';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseDto } from '../user/dto/response/user-response.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { ForgotPasswordResponseDto } from './dto/response/forgot-password-response.dto';
import { VerifyForgotPasswordDto } from './dto/request/verify-forgot-password.dto';
import { passwordGenerate } from 'src/common/utils/password-generate.util';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { ChangePasswordResponseDto } from './dto/response/change-password-response.dto';
import { BaseService } from 'src/base.service';
import { UploadDto } from 'src/common/dto/upload.dto';
import { UploadResponseDto } from 'src/common/dto/upload-reponse.dto';
import { S3Service } from '../shared/s3/s3.service';
import { BucketFolder } from 'src/common/enum/bucket-folder.enum';
import { RoleType } from 'src/common/enum/role.enum';
import { UserShareService } from '../user/user-share.service';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { NotificationService } from 'src/modules/notification/notification.service';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly userShareService: UserShareService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly s3Service: S3Service,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

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
      token,
    };
  }

  async verifyRegister(
    dto: VerifyRegisterDto,
    token: string,
  ): Promise<SaveEntityResponseDto> {
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
    return await this.userShareService.create({
      email: redisValue.email,
      password: redisValue.password,
    });
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['roles'],
    });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }
    if (!user || !comparePassword(user.password, password)) {
      throw new ServerException(ERROR_RESPONSE.INCREDENTIAL);
    }
    return await this.manageUserToken(user);
  }

  async logout(user: UserRequestPayload): Promise<SuccessReponseDto> {
    const { id, jti } = user;
    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    await this.redisService.deleteKey(userTokenKey);
    return this.suceesResponse();
  }

  async manageUserToken(user: UserEntity): Promise<LoginResponseDto> {
    const jti = v4();
    const payload: Partial<JwtPayload> = {
      id: user.id,
      email: user.email,
      jti: jti,
      roles: user.roles.map((role) => role.name) as RoleType[],
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        _.assign(payload, { type: TokenType.ACCESS_TOKEN }) as JwtPayload,
        TokenType.ACCESS_TOKEN,
        this.configService.get<string>('JWT_ACCESS_EXPIRES'),
      ),
      this.generateToken(
        _.assign(payload, { type: TokenType.REFRESH_TOKEN }) as JwtPayload,
        TokenType.REFRESH_TOKEN,
        this.configService.get<string>('JWT_REFRESH_EXPIRES'),
      ),
    ]);

    await this.redisService.setValue(
      this.redisService.getUserTokenKey(user.id, jti),
      'devicedId',
      convertDatePatternToSecond(
        this.configService.get<string>('JWT_REFRESH_EXPIRES'),
      ),
    );

    return { accessToken, refreshToken };
  }

  async generateToken(
    payload: JwtPayload,
    tokenType: TokenType,
    expiresIn: number | string,
  ): Promise<string> {
    const tokenExpireIn =
      tokenType === TokenType.ACCESS_TOKEN
        ? this.configService.get<string>('JWT_ACCESS_EXPIRES')
        : this.configService.get<string>('JWT_REFRESH_EXPIRES');
    return this.jwtService.sign(payload, {
      expiresIn: expiresIn || tokenExpireIn,
    });
  }

  async getProfile(id: string): Promise<UserResponseDto> {
    await this.notificationService.create({
      alertTo: RoleType.USER,
      userId: id,
      meta: { text: 'Hello' },
      content: 'Content',
      navigateTo: 'Navigate to',
      title: 'Title',
      triggerBy: 'Trigger by',
    });
    return plainToInstance(
      UserResponseDto,
      await this.userShareService.findOne(id),
    );
  }

  async refreshToken(user: JwtPayload): Promise<RefreshTokenResponseDto> {
    const jti = v4();
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      jti,
      type: TokenType.ACCESS_TOKEN,
      roles: user.roles,
    };
    const userTokenKey = this.redisService.getUserTokenKey(user.id, jti);
    await this.redisService.setValue(
      userTokenKey,
      'deviceId',
      convertDatePatternToSecond(
        this.configService.get<string>('JWT_ACCESS_EXPIRES'),
      ),
    );
    const accessToken = await this.generateToken(
      payload,
      TokenType.ACCESS_TOKEN,
      this.configService.get<string>('JWT_ACCESS_EXPIRES'),
    );
    return {
      accessToken,
    };
  }

  async forgotPassword(
    dto: ForgotPasswordDto,
  ): Promise<ForgotPasswordResponseDto> {
    const { email } = dto;
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }
    const token = v4();
    const OTP = generateOTP(6);
    await this.mailService.sendForgotPasswordMail(OTP, email);
    const redisValue = {
      OTP,
      userId: user.id,
    };
    await this.redisService.setValue(token, redisValue, 300);
    return {
      token,
    };
  }

  async verifyForgotPassword(
    token: string,
    dto: VerifyForgotPasswordDto,
  ): Promise<SuccessReponseDto> {
    const { OTP } = dto;
    const redisValue = await this.redisService.getValue(token);
    if (OTP !== redisValue.OTP) {
      throw new ServerException(ERROR_RESPONSE.OTP_INVALID);
    }
    const newPassword = passwordGenerate(8);
    const hassPassword = hassingPassword(newPassword);
    const user = await this.userRepo.findOneBy({ id: redisValue.userId });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }
    await this.userRepo.update(
      { id: user.id },
      {
        password: hassPassword,
      },
    );
    await this.mailService.sendNewPassword(newPassword, user.email);

    const userPatternKey = this.redisService.getUserPatternKey(user.id);
    await this.redisService.deleteByPattern(userPatternKey);

    return this.suceesResponse();
  }

  async changePassword(
    user: UserRequestPayload,
    dto: ChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const { id } = user;
    const { newPassword } = dto;

    const hashPassword = hassingPassword(newPassword);
    await this.userRepo.update(
      { id },
      {
        password: hashPassword,
      },
    );

    const userPatternKey = this.redisService.getUserPatternKey(id);
    await this.redisService.deleteByPattern(userPatternKey);

    return await this.manageUserToken(
      await this.userRepo.findOne({ where: { id }, relations: ['roles'] }),
    );
  }

  async upload(dto: UploadDto): Promise<UploadResponseDto> {
    const { fileName, contentType } = dto;
    return await this.s3Service.getPresign(
      fileName,
      contentType,
      BucketFolder.AVATAR,
    );
  }

  async updateProfile(
    user: UserRequestPayload,
    dto: UpdateProfileDto,
  ): Promise<SaveEntityResponseDto> {
    return await this.userShareService.updateProfile(user, dto);
  }
}
