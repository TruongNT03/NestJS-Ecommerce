import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTrainingLogsTable1765015883540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('chatbot_training_logs', [
      new TableColumn({
        name: 'test_question',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'test_answer',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'test_accuracy',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'test_answer_from',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('chatbot_training_logs', [
      'test_question',
      'test_answer',
      'test_accuracy',
      'test_answer_from',
    ]);
  }
}
