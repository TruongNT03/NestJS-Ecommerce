import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrderTableAddMarkReviewed1765358400697
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_items',
      new TableColumn({
        name: 'is_reviewed',
        type: 'boolean',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order_items', 'is_reviewed');
  }
}
