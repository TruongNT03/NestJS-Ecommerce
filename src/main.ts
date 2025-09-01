import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(AppModule.name);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('My Shop Documentation Swagger')
    .setDescription('My Shop API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(PORT, () => {
    logger.log(`Server listen on PORT: ${PORT}`);
  });
}
bootstrap();
