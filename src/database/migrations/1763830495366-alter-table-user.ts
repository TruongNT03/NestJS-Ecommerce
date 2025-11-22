import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUser1763830495366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'first_name');

    await queryRunner.changeColumn(
      'users',
      'last_name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'gender',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumns('users', ['phone_number', 'gender']);
  }
}
