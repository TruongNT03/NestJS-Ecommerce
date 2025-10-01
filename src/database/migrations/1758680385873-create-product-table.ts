import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateProductTable1758680385873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '255',
            isUnique: true,
          }),
          new TableColumn({
            name: 'description',
            type: 'text',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          }),
          new TableColumn({
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }),
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'product_categories',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'product_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'category_id',
            type: 'int',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('product_categories');
  }
}
