import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserNameColumn1757820368542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['first_name', 'last_name']);
  }
}
