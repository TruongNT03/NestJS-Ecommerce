import { Inject, Injectable } from '@nestjs/common';
import { AskDto } from './dto/request/ask.dto';
import { AskResponseDto } from './dto/response/ask-response.dto';
import axios from 'axios';
import { GetAnswerResponseDto } from './dto/response/get-answer-response.dto';
import { BaseService } from 'src/base.service';
import { chatbotServiceConfiguration } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';

@Injectable()
export class ChatbotService extends BaseService {
  constructor(
    @Inject(chatbotServiceConfiguration.KEY)
    private readonly chatbotServiceConfig: ConfigType<
      typeof chatbotServiceConfiguration
    >,
  ) {
    super();
  }

  async ask(dto: AskDto): Promise<AskResponseDto> {
    const { question } = dto;
    try {
      const response = (
        await axios.post<GetAnswerResponseDto>(
          `${this.chatbotServiceConfig.host}:${this.chatbotServiceConfig.port}/ask`,
          {
            data: {
              question,
            },
          },
        )
      ).data;

      return plainToInstance(AskResponseDto, {
        answer: response.answer,
      });
    } catch (error) {
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: error?.response?.data?.message,
      });
    }
  }
}
