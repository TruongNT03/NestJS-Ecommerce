import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreatePaymentTable1761789624608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'order_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'payment_type',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'amount',
            type: 'decimal',
          }),
          new TableColumn({
            name: 'currency',
            type: 'varchar',
            default: `'VND'`,
          }),
          new TableColumn({
            name: 'status',
            type: 'varchar',
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
    await queryRunner.dropTable('payments');
  }
}
