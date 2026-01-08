import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableProductAddDiscount1767864437305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'discount',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'discount');
  }
}
