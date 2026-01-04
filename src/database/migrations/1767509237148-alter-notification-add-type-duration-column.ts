import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterNotificationAddTypeDurationColumn1767509237148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('notifications', [
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'duration',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('notifications', ['type', 'duration']);
  }
}
