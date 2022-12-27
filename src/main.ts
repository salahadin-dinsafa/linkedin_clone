import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/all-exception.filter';

const logStream = fs.createWriteStream('api.log', { flags: 'a' });

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter);
  logger.verbose('Generate api catche')
  app.use(morgan('combined', { stream: logStream }));

  const options = new DocumentBuilder()
    .setTitle('Partial linkedin clone application')
    .setContact('Salahadin Dinsafa', '', 'salahadindinsafa@gmail.com')
    .setVersion('1.0.0')
    .setExternalDoc('Linkedin', 'https://linkedin.com')
    .setLicense('MIT', 'https://api.openapi.org/MIT')
    .build()

  const document = SwaggerModule.createDocument(app, options);
  logger.verbose('Swagger Documentation Generation Started')
  SwaggerModule.setup('api', app, document);

  const port: number = +process.env.port || 3000;
  await app.listen(port);
  logger.verbose(`Application satarted on ${port}`);
}


bootstrap();
