import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateProductVariantTable1758682403840
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'variants',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '255',
            isUnique: true,
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
    await queryRunner.createTable(
      new Table({
        name: 'variant_values',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'value',
            type: 'varchar',
            length: '255',
          }),
          new TableColumn({
            name: 'variant_id',
            type: 'int',
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
    await queryRunner.createTable(
      new Table({
        name: 'product_variants',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'product_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'price',
            type: 'decimal',
          }),
          new TableColumn({
            name: 'sku',
            type: 'varchar',
            length: '255',
          }),
          new TableColumn({
            name: 'stock',
            type: 'int',
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
    await queryRunner.createTable(
      new Table({
        name: 'product_variant_values',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'product_variant_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'variant_value_id',
            type: 'int',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('variants');
    await queryRunner.dropTable('variant_values');
    await queryRunner.dropTable('product_variants');
    await queryRunner.dropTable('product_variant_values');
  }
}
