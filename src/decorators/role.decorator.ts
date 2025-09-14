import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/common/enum/role.enum';

export const ROLE = 'ROLE';

export const Role = (role: RoleType[]) => SetMetadata(ROLE, role);
