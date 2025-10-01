import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlertCategoriesIdType1758991584694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'categories',
      'id',
      new TableColumn({
        name: 'id',
        type: 'int',
        isPrimary: true,
        isUnique: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'categories',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isUnique: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      }),
    );
  }
}
