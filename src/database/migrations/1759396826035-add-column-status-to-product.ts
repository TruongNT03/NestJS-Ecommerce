import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnStatusToProduct1759396826035
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        length: '255',
        default: "'draft'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'status');
  }
}
