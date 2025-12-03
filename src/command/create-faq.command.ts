import { Command, CommandRunner } from 'nest-commander';
import { commandConstants } from './command.constant';
import { DataSource } from 'typeorm';
import { FAQ_META_DATA } from 'src/master-data/faq.data';
import { ChatbotData } from 'src/entities/faq.entity';
import { FaqType } from 'src/common/enum/faq-type.enum';

@Command({ name: commandConstants.createFaq })
export class CreateFaqCommand extends CommandRunner {
  constructor(private readonly dataSource: DataSource) {
    super();
  }
  async run(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        FAQ_META_DATA.map(async (faq) => {
          await queryRunner.manager.save(ChatbotData, {
            question: faq.question,
            answer: faq.answer,
            type: faq.type as FaqType,
          });
        }),
      );

      await queryRunner.commitTransaction();
      console.log('FAQs created successfully.');
    } catch (err) {
      console.error('Error creating FAQs:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
