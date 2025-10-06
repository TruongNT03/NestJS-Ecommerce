import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterProductNameColumn1759476467610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: true,
      }),
    );
  }
}
