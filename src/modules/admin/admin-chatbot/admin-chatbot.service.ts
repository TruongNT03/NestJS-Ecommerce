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

@Injectable()
export class AdminChatbotService extends BaseService {
  constructor(
    @InjectRepository(ChatbotData)
    private readonly chatbotDataRepo: Repository<ChatbotData>,
    @Inject(chatbotServiceConfiguration.KEY)
    private readonly chatbotServiceConfig: ConfigType<
      typeof chatbotServiceConfiguration
    >,
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

  async retraining() {
    try {
      const response = (
        await axios.post(
          `${this.chatbotServiceConfig.host}:${this.chatbotServiceConfig.port}/retrain`,
        )
      ).data;

      return this.successResponse();
    } catch (error) {
      console.log(error);
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: error?.response?.data?.message,
      });
    }
  }
}
