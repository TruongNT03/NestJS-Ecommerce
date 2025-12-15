import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTableAddGoogleColumn1765644102203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'login_type',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'meta_data',
        type: 'jsonb',
        isNullable: true,
      }),
    ]);

    await queryRunner.query(`
        ALTER TABLE users
        ALTER COLUMN password DROP NOT NULL;
    `);

    await queryRunner.query(`
      UPDATE users
      SET login_type = 'default'
      WHERE login_type IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['login_type', 'meta_data']);
  }
}
