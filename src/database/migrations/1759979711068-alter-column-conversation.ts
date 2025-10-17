import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnConversation1759979711068
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user_conversations',
      'user_id',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'messages',
      'sender_id',
      new TableColumn({
        name: 'sender_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user_conversations',
      'user_id',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    await queryRunner.changeColumn(
      'messages',
      'sender_id',
      new TableColumn({
        name: 'sender_id',
        type: 'uuid',
      }),
    );
  }
}
