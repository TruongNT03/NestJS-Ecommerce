import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateCartTable1760606957616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carts',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isUnique: true,
            isPrimary: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'uuid',
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
        name: 'cart_items',
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
            name: 'cart_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'product_variant_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'quantity',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carts');
    await queryRunner.dropTable('cart_items');
  }
}
