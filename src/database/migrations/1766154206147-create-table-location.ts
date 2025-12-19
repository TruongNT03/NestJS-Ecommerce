import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLocation1766154206147 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'location',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'address',
            type: 'text',
          },
          {
            name: 'hotline',
            type: 'varchar',
          },
          {
            name: 'open_time',
            type: 'varchar',
          },
          {
            name: 'close_time',
            type: 'varchar',
          },
          {
            name: 'open_date',
            type: 'varchar',
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
    await queryRunner.dropTable('location');
  }
}
