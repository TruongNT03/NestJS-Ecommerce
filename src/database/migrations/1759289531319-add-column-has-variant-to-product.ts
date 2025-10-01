import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnHasVariantToProduct1759289531319
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'has_variant',
        type: 'boolean',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'has_variant');
  }
}
