import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterVoucherColumnAddIsPublish1765956963850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vouchers',
      new TableColumn({
        name: 'is_public',
        type: 'boolean',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('vouchers', 'is_public');
  }
}
