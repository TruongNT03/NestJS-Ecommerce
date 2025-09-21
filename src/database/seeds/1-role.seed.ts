import { RoleEntity } from '../../entities/role.entity';
import { RoleMasterData } from '../../master-data/role.data';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class RoleSeeding implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query('TRUNCATE TABLE roles RESTART IDENTITY CASCADE');
      for (const role of RoleMasterData) {
        await queryRunner.manager.save(RoleEntity, {
          name: role.name,
        });
      }
      await queryRunner.commitTransaction();
      console.log(`\nFinish Seed RoleSeed Success.`);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Seeding Role failed:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
