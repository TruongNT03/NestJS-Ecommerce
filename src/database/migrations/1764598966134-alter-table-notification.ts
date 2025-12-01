import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableNotification1764598966134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'notifications',
      'alert_to',
      new TableColumn({
        name: 'alert_to',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
