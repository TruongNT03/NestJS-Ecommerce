import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrderTable1761815973621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'order_code',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'payments',
      new TableColumn({
        name: 'order_code',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'order_code');
    await queryRunner.dropColumn('payments', 'order_code');
  }
}
