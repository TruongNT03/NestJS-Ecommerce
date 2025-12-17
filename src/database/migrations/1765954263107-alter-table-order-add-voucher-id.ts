import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableOrderAddVoucherId1765954263107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'voucher_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'voucher_id');
  }
}
