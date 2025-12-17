import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnFinalPriceInOrderTable1765946004556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'final_price',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'final_price');
  }
}
