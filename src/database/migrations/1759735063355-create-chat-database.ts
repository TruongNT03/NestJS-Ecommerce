import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateChatDatabase1759735063355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'conversations',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
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
        name: 'user_conversations',
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
            name: 'user_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'conversation_id',
            type: 'uuid',
          }),
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'messages',
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
            name: 'content',
            type: 'text',
          }),
          new TableColumn({
            name: 'sender_id',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'conversation_id',
            type: 'uuid',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('conversations');
    await queryRunner.dropTable('user_conversations');
    await queryRunner.dropTable('messages');
  }
}
