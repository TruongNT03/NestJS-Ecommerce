import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateAddressTable1761358754509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
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
            name: 'user_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'address',
            type: 'varchar',
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
    await queryRunner.dropTable('addresses');
  }
}
