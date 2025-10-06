import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateProductImageTable1759641466011
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_images',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
          }),
          new TableColumn({
            name: 'url',
            type: 'text',
          }),
          new TableColumn({
            name: 'product_id',
            type: 'uuid',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_images');
  }
}
