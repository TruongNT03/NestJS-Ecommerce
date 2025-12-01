import { Command, CommandRunner } from 'nest-commander';
import { commandConstants } from './command.constant';
import { VARIANT_VALUE_META_DATA } from 'src/master-data/variant.data';
import { VARIANT_META_DATA } from 'src/master-data/variant.data';
import { DataSource } from 'typeorm';
import { Variant } from 'src/entities/variant.entity';
import { VariantValue } from 'src/entities/variant-value.entity';

@Command({
  name: commandConstants.createVariant,
})
export class CreateVariantCommand extends CommandRunner {
  constructor(private readonly dataSource: DataSource) {
    super();
  }
  async run(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    await queryRunner.query(
      'TRUNCATE TABLE variants RESTART IDENTITY CASCADE;',
    );
    await queryRunner.query(
      'TRUNCATE TABLE variant_values RESTART IDENTITY CASCADE;',
    );
    try {
      for (let variant of VARIANT_META_DATA) {
        // Save variant
        const variantEntity = await queryRunner.manager.save(Variant, {
          name: variant.name,
        });

        // Save variant values
        const values = VARIANT_VALUE_META_DATA.filter(
          (v) => v.variantName === variant.name,
        );
        for (let value of values) {
          await queryRunner.manager.save(VariantValue, {
            value: value.value,
            variantId: variantEntity.id,
          });
        }
      }
      await queryRunner.commitTransaction();
      console.log('Variants and variant values created successfully.');
    } catch (error) {
      console.error('Error creating variants and variant values:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
