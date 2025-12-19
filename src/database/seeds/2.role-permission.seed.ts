import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { RolePermissionData } from 'src/master-data/role-permission.data';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';
import { RoleEntity } from 'src/entities/role.entity';

export class RolePermissionSeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`TRUNCATE TABLE role_permission_maps`);
      await Promise.all(
        RolePermissionData.map(async (rolePermission) => {
          const role = await queryRunner.manager.findOne(RoleEntity, {
            where: { name: rolePermission.role },
          });
          await queryRunner.manager.save(RolePermissionMap, {
            roleId: role.id,
            module: rolePermission.module,
            isCreate: rolePermission.isCreate,
            isRead: rolePermission.isUpdate,
            isUpdate: rolePermission.isUpdate,
            isDelete: rolePermission.isDelete,
          });
        }),
      );

      await queryRunner.commitTransaction();
      console.log('\nSeed Role Permission Map Successfully!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('\nSeed Role Permission Map Successfully!', error);
    } finally {
      await queryRunner.release();
    }
  }
}
