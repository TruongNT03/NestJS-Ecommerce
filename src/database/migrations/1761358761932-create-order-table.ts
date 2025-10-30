import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateOrderTable1761358761932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
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
            name: 'user_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'address_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'total_price',
            type: 'int',
          }),
          new TableColumn({
            name: 'status',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'payment_type',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'payment_status',
            type: 'boolean',
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
        name: 'order_items',
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
            name: 'order_id',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
    await queryRunner.dropTable('order_items');
  }
}
