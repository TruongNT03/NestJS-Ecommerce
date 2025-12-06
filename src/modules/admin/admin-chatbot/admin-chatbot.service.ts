import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { CreateFaqDto } from './dto/request/create-faq.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatbotData } from 'src/entities/faq.entity';
import { Brackets, Repository } from 'typeorm';
import {
  AdminListFaqQueryDto,
  ListFaqSortField,
} from './dto/request/list-faq-query.dto';
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

@Injectable()
export class AdminChatbotService extends BaseService {
  constructor(
    @InjectRepository(ChatbotData)
    private readonly chatbotDataRepo: Repository<ChatbotData>,
    @InjectRepository(ChatBotTrainingLog)
    private readonly chatbotTrainingLogRepo: Repository<ChatBotTrainingLog>,
    @Inject(chatbotServiceConfiguration.KEY)
    private readonly chatbotServiceConfig: ConfigType<
      typeof chatbotServiceConfiguration
    >,
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

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

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
}
