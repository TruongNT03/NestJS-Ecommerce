import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAddresses1763873089681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'addresses',
      'address',
      new TableColumn({
        name: 'detail',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumns('addresses', [
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_default',
        type: 'boolean',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'addresses',
      'detail',
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumns('addresses', [
      'phone_number',
      'name',
      'is_default',
    ]);
  }
}
