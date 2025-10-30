import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrderTable1761789489438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('orders', [
      'total_price',
      'payment_type',
      'payment_status',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('orders', [
      new TableColumn({
        name: 'total_price',
        type: 'int',
        isNullable: true,
      }),

      new TableColumn({
        name: 'payment_type',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'payment_status',
        type: 'boolean',
        isNullable: true,
      }),
    ]);
  }
}
