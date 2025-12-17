import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppDataSource } from 'datasourceConfig';
import { EntityTarget } from 'typeorm';

/**
 * Guidance:
 *
 * @Validate(Exist<Entity>, [EntityTarget, FieldToCheck, isAlreadyExistCheck, withDeleted])
 *
 * Default to check already exist
 *
 * @param {EntityTarget} EntityTarget - Entity class
 * @param {string} FieldToCheck - Field to check in entity
 * @param {boolean} isAlreadyExistCheck - Check is already exist <true> or not exist <false>
 * @param {boolean} withDeleted - Include deleted record
 */

@ValidatorConstraint({ name: 'Exist', async: false })
export class Exist<T> implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const args = validationArguments.constraints;
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const entity = args[0] as EntityTarget<T>;
    const targetColumn = args[1] as string;
    const isAlreadyExistCheck = args[2] as boolean;
    const withDeleted = args[3] as boolean;
    const queryBuilder = AppDataSource.getRepository(entity);
    const exist = await queryBuilder
      .createQueryBuilder('e')
      .where(`e.${targetColumn} = :value`, { value: value })
      .getOne();
    return isAlreadyExistCheck ? !!!exist : !!exist;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const targetColumn = validationArguments.constraints[1];
    const isAlreadyExistCheck = validationArguments.constraints[2];
    return isAlreadyExistCheck
      ? `${validationArguments.constraints[0].name} with #${targetColumn} is already exist`
      : `${validationArguments.constraints[0].name} with #${targetColumn} is not exist`;
  }
}
