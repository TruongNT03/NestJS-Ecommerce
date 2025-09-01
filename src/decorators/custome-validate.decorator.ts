import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppDataSource } from 'datasourceConfig';
import { EntityTarget } from 'typeorm';

@ValidatorConstraint({ name: 'Exist', async: false })
export class Exist<T> implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const args = validationArguments.constraints;
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const entity = args[0] as EntityTarget<T>;
    const targetColumn = args[1] as string;
    const withDeleted = args[2] as boolean;
    const queryBuilder = AppDataSource.getRepository(entity);
    const exist = await queryBuilder
      .createQueryBuilder('e')
      .where(`e.${targetColumn} = :value`, { value: value })
      .getOne();
    return !!!exist;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Conflick Error, Entity is already exist';
  }
}
