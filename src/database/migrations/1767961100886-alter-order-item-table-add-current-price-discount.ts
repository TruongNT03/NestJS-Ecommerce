import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrderItemTableAddCurrentPriceDiscount1767961100886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('order_items', [
      new TableColumn({
        name: 'current_price',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'current_discount',
        type: 'int',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('order_items', ['current_price', 'current_discount']);
  }
}
