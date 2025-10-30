import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateAddressDto } from './dto/request/create-address.dto';
import { ListAddressQueryDto } from './dto/request/list-address-query.dto';
import { ListAddressResponseDto } from './dto/response/list-address-response.dto';
import { UpdateAddressDto } from './dto/request/update-address.dto';

@ApiTags('[USER] ADDRESS')
@ApiBearerAuth()
@Role([RoleType.USER])
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '[USER] CREATE ADDRESS' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post('')
  async create(
    @User() user: UserRequestPayload,
    @Body() body: CreateAddressDto,
  ): Promise<SuccessResponseDto> {
    return await this.addressService.create(user, body);
  }

  @ApiOperation({ summary: '[USER] GET ALL ADDRESS' })
  @ApiResponse({ status: 200, type: ListAddressResponseDto })
  @Get('')
  async findAll(
    @User() user: UserRequestPayload,
    @Query() query: ListAddressQueryDto,
  ): Promise<ListAddressResponseDto> {
    return await this.addressService.findAll(user, query);
  }

  @ApiOperation({ summary: '[USER] UPDATE ADDRESS' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAddressDto,
  ): Promise<SuccessResponseDto> {
    return await this.addressService.update(id, body);
  }
}
