import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrderTable1765349977902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('orders', [
      new TableColumn({
        name: 'payment_method',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'payment_status',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('orders', [
      'payment_method',
      'payment_status',
    ]);
  }
}
