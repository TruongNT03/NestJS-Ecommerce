import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterPaymentColumn1761819576884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'payments',
      'payment_type',
      new TableColumn({
        name: 'payment_type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'payments',
      'payment_type',
      new TableColumn({
        name: 'payment_type',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }
}
