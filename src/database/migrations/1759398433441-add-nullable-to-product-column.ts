import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableToProductColumn1759398433441
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            ALTER TABLE "products" 
                ALTER COLUMN "name" DROP NOT NULL,
                ALTER COLUMN "description" DROP NOT NULL;
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            ALTER TABLE "products"
                ALTER COLUMN "name" SET NOT NULL,
                ALTER COLUMN "description" SET NOT NULL;
            `,
    );
  }
}
