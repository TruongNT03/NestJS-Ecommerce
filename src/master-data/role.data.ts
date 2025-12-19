import { RoleType } from 'src/common/enum/role.enum';

export const RoleMasterData: { name: RoleType }[] = [
  { name: RoleType.ADMIN },
  { name: RoleType.USER },
  { name: RoleType.PRODUCT_MANAGER },
  { name: RoleType.ORDER_MANAGER },
  { name: RoleType.TECHNICIAN },
];
