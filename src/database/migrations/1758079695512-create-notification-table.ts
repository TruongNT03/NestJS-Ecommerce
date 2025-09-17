import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateNotificationTable1758079695512
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'title',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'content',
            type: 'text',
          }),
          new TableColumn({
            name: 'alert_to',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'trigger_by',
            type: 'text',
          }),
          new TableColumn({
            name: 'navigate_to',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'is_read',
            type: 'boolean',
            default: false,
          }),
          new TableColumn({
            name: 'meta',
            type: 'jsonb',
            isNullable: true,
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
    await queryRunner.dropTable('notifications');
  }
}
