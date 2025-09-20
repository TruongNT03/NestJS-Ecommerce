import { RoleEntity } from 'src/entities/role.entity';
import { RoleMasterData } from 'src/master-data/role.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-seeding';

export default class RoleSeeding implements Seeder {
  public async run(factory: any, dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
