import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyRegisterDto } from './dto/request/verify-register.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginDto } from './dto/request/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/decorators/user.decorator';
import { JwtPayload, UserRequestPayload } from './auth.interface';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RefreshTokenResponseDto } from './dto/response/refresh-token-response.dto';
import { UserResponseDto } from '../user/dto/response/user-response.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { ForgotPasswordResponseDto } from './dto/response/forgot-password-response.dto';
import { verifyForgotPasswordDto } from './dto/request/verify-forgot-password.dto';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { ChangePasswordResponseDto } from './dto/response/change-password-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Register account' })
  @ApiResponse({ type: RegisterResponseDto, status: 201 })
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(body);
  }

  @Public()
  @ApiOperation({ summary: 'Verify register request' })
  @ApiResponse({ type: SaveEntityResponseDto, status: 200 })
  @Post('register/verify/:id')
  async verifyRegister(
    @Body() body: VerifyRegisterDto,
    @Param('id') token: string,
  ): Promise<SaveEntityResponseDto> {
    return await this.authService.verifyRegister(body, token);
  }

  @Public()
  @ApiOperation({ summary: 'Login account' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout account' })
  @ApiResponse({ status: 200, type: SuccessReponseDto })
  @Get('logout')
  async logout(@User() user: UserRequestPayload): Promise<SuccessReponseDto> {
    return await this.authService.logout(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Get('profile')
  async getProfile(@User() user: JwtPayload): Promise<UserResponseDto> {
    return await this.authService.getProfile(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 201, type: RefreshTokenResponseDto })
  @Get('refresh-token')
  async refreshToken(
    @User() user: JwtPayload,
  ): Promise<RefreshTokenResponseDto> {
    return await this.authService.refreshToken(user);
  }

  @Public()
  @ApiOperation({ summary: 'Request forgot password' })
  @ApiResponse({ status: 201, type: ForgotPasswordResponseDto })
  @Post('forgot-password')
  async forgotPassword(
    @Body() body: ForgotPasswordDto,
  ): Promise<ForgotPasswordResponseDto> {
    console.log(body);
    return await this.authService.forgotPassword(body);
  }

  @Public()
  @ApiOperation({ summary: 'Verify forgot password' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('forgot-password/verify/:token')
  async verifyForgotPassword(
    @Body() body: verifyForgotPasswordDto,
    @Param('token') token: string,
  ): Promise<SuccessReponseDto> {
    return await this.authService.verifyForgotPassword(token, body);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('change-password')
  async changePassword(
    @User() user: UserRequestPayload,
    @Body() body: ChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    return await this.authService.changePassword(user, body);
  }
}
