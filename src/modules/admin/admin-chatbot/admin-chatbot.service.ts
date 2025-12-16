import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { CreateFaqDto } from './dto/request/create-faq.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatbotData } from 'src/entities/faq.entity';
import { Brackets, DataSource, Repository } from 'typeorm';
import { AdminListFaqQueryDto, ListFaqSortField } from './dto/request/list-faq-query.dto';
import { AdminListFaqResponseDto } from './dto/response/admin-list-faq-response.dto';
import { plainToInstance } from 'class-transformer';
import { chatbotServiceConfiguration } from 'src/config';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { AdminFaqSummaryResponseDto } from './dto/response/admin-faq-summary-response.dto';
import { ChatBotTrainingLog } from 'src/entities/chatbot-training-log.entity';
import { ChatbotTrainingStatus } from 'src/common/enum/chatbot-training-status.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ChatbotServiceResponseDto } from './dto/response/chatbot-service-response.dto';
import { Response } from 'express';
import * as exceljs from 'exceljs';
import { FaqType } from 'src/common/enum/faq-type.enum';
import { FaqTemplateHeader } from 'src/common/enum/faq-template-header.enum';

@Injectable()
export class AdminChatbotService extends BaseService {
  constructor(
    @InjectRepository(ChatbotData)
    private readonly chatbotDataRepo: Repository<ChatbotData>,
    @InjectRepository(ChatBotTrainingLog)
    private readonly chatbotTrainingLogRepo: Repository<ChatBotTrainingLog>,
    @Inject(chatbotServiceConfiguration.KEY)
    private readonly chatbotServiceConfig: ConfigType<typeof chatbotServiceConfiguration>,
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  async create(dto: CreateFaqDto): Promise<SuccessResponseDto> {
    const { question, answer, type } = dto;

    await this.chatbotDataRepo.save({
      question,
      answer,
      type,
    });

    return this.successResponse();
  }

  async findAll(dto: AdminListFaqQueryDto): Promise<AdminListFaqResponseDto> {
    const { page, pageSize, search, sortBy, sortOrder, typeFilter } = dto;

    const queryBuilder = this.chatbotDataRepo.createQueryBuilder('chatbot');

    if (search) {
      queryBuilder.where(
        new Brackets((qb) =>
          qb
            .where('LOWER(chatbot.question) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            })
            .orWhere('LOWER(chatbot.answer) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            })
            .orWhere('LOWER(chatbot.type) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            }),
        ),
      );
    }

    if (typeFilter) {
      queryBuilder.andWhere('chatbot.type = :type', { type: typeFilter });
    }

    const sortFieldMap: Record<ListFaqSortField, string> = {
      [ListFaqSortField.QUESTION]: 'chatbot.question',
      [ListFaqSortField.ANSWER]: 'chatbot.answer',
      [ListFaqSortField.TYPE]: 'chatbot.type',
    };

    const sortField = sortFieldMap[sortBy];

    if (sortField) {
      if (sortOrder) {
        queryBuilder.orderBy(sortField, sortOrder);
      } else {
        queryBuilder.orderBy(sortField, 'DESC');
      }
    } else {
      queryBuilder.orderBy('chatbot.updatedAt', 'DESC');
    }

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(AdminListFaqResponseDto, {
      data,
      paginate,
    });
  }

  async retraining(): Promise<SuccessResponseDto> {
    try {
      const response = (
        await axios.post<ChatbotServiceResponseDto>(
          `${this.chatbotServiceConfig.host}:${this.chatbotServiceConfig.port}/retrain`,
        )
      ).data;

      await this.chatbotTrainingLogRepo.save({
        status: ChatbotTrainingStatus.SUCCESS,
        testQuestion: response.question,
        testAnswer: response.answer,
        testAccuracy: response.accuracy,
        testAnswerFrom: response.answer_from,
      });

      return this.successResponse();
    } catch (error) {
      await this.chatbotTrainingLogRepo.save({
        status: ChatbotTrainingStatus.FAIL,
      });

      this.logger.error('Fail to retraining chatbot', {
        context: 'AdminChatbotService.retraining',
        error,
      });

      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: error?.response?.data?.message,
      });
    }
  }

  async delete(id: number): Promise<SuccessResponseDto> {
    await this.chatbotDataRepo.delete(id);
    return this.successResponse();
  }

  async update(id: number, dto: CreateFaqDto): Promise<SuccessResponseDto> {
    await this.chatbotDataRepo.update(id, dto);
    return this.successResponse();
  }

  async getSummary(): Promise<AdminFaqSummaryResponseDto> {
    const totalFaqs = await this.chatbotDataRepo.count();
    const totalFaqCategories = await this.chatbotDataRepo
      .createQueryBuilder('chatbot')
      .select('COUNT(DISTINCT chatbot.type)', 'count')
      .getRawOne();

    const latestTraining = await this.chatbotTrainingLogRepo.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(AdminFaqSummaryResponseDto, {
      totalFaqs,
      totalFaqCategories: totalFaqCategories.count,
      latestTraining,
    });
  }

  async downloadTemplate(res: Response) {
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet('Sheet 1');
    sheet.addRow([FaqTemplateHeader.QUESTION, FaqTemplateHeader.ANSWER, FaqTemplateHeader.TYPE]);

    const headerRow = sheet.getRow(1);

    headerRow.eachCell((cell) => {
      cell.font = {
        color: { argb: 'FFFFFFFF' },
        bold: true,
      };

      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '024e82' },
      };
    });

    sheet.getColumn(1).width = 50;
    sheet.getColumn(2).width = 50;
    sheet.getColumn(3).width = 10;

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Disposition', 'attachment; filename=template.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    return res.send(buffer);
  }

  async uploadFaqFile(file: Express.Multer.File): Promise<SuccessResponseDto> {
    const buffer = file.buffer as unknown as exceljs.Buffer;
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const data: CreateFaqDto[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        const question = row.getCell(1).value;
        const answer = row.getCell(2).value;
        const type = row.getCell(3).value;
        if (
          question !== FaqTemplateHeader.QUESTION ||
          answer !== FaqTemplateHeader.ANSWER ||
          type !== FaqTemplateHeader.TYPE
        ) {
          throw new ServerException({
            ...ERROR_RESPONSE.BAD_REQUEST,
            message: 'Please use correct template!',
          });
        }
        return;
      }

      const question = row.getCell(1).value;
      const answer = row.getCell(2).value;
      const type = row.getCell(3).value;

      if (question && answer && type) {
        data.push({
          question: question as string,
          answer: answer as string,
          type: type as FaqType,
        });
      }
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(
        data.map((faq) => {
          this.chatbotDataRepo.save({
            question: faq.question,
            answer: faq.answer,
            type: faq.type,
          });
        }),
      );
      await queryRunner.commitTransaction();

      return this.successResponse();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ServerException({ ...ERROR_RESPONSE.BAD_REQUEST });
    } finally {
      await queryRunner.release();
    }
  }
}
