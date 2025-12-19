import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolePermissionTable1766153434504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_permission_maps',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'module',
            type: 'varchar',
          },
          {
            name: 'is_create',
            type: 'boolean',
          },
          {
            name: 'is_read',
            type: 'boolean',
          },
          {
            name: 'is_update',
            type: 'boolean',
          },
          {
            name: 'is_delete',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role_permission_maps');
  }
}
