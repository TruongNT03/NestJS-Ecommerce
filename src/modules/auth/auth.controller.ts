import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyRegisterDto } from './dto/verify-register.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register account' })
  @ApiResponse({ type: RegisterResponseDto, status: 201 })
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(body);
  }

  @ApiOperation({ summary: 'Verify register request' })
  @ApiResponse({ type: SuccessReponseDto, status: 200 })
  @Post('register/verify/:id')
  async verifyRegister(
    @Body() body: VerifyRegisterDto,
    @Param('id') token: string,
  ) {
    return await this.authService.verifyRegister(body, token);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
