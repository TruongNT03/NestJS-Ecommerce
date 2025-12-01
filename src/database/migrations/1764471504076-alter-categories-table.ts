import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCategoriesTable1764471504076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'categories',
      'description',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'categories',
      'image',
      new TableColumn({
        name: 'image',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
