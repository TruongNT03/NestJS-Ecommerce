import { Command, CommandRunner } from 'nest-commander';
import { commandConstants } from './command.constant';
import { DataSource } from 'typeorm';
import { CATEGORY_META_DATA } from 'src/master-data/category.data';
import { Categories } from 'src/entities/categories.entity';

@Command({
  name: commandConstants.createCategory,
})
export class CreateCategoryCommand extends CommandRunner {
  constructor(private readonly dataSource: DataSource) {
    super();
  }
  async run(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    await queryRunner.query(
      'TRUNCATE TABLE categories RESTART IDENTITY CASCADE;',
    );
    try {
      for (let category of CATEGORY_META_DATA) {
        await queryRunner.manager.save(Categories, {
          title: category.name,
          description: category.description,
        });
      }
      await queryRunner.commitTransaction();
      console.log('Categories created successfully.');
    } catch (error) {
      console.error('Error creating categories:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
