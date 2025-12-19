import { PartialType } from '@nestjs/swagger';
import { AdminCreateLocationDto } from './admin-create-location-response.dto';

export class AdminUpdateLocationDto extends PartialType(AdminCreateLocationDto) {}
