import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVoucher1765868239967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vouchers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'discount_value',
            type: 'int',
          },
          {
            name: 'max_discount_value',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'min_order_value',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'stock',
            type: 'int',
          },
          {
            name: 'expiry_at',
            type: 'timestamp with time zone',
          },
          {
            name: 'total_used',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'campaign_name',
            type: 'text',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_vouchers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'voucher_id',
            type: 'uuid',
          },
          {
            name: 'is_used',
            type: 'boolean',
            default: false,
          },
          {
            name: 'used_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vouchers');
    await queryRunner.dropTable('user_vouchers');
  }
}
