import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/all-exception.filter';

const logStream = fs.createWriteStream('api.log', { flags: 'a' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter);
  app.use(morgan('combined', { stream: logStream }));

  const options = new DocumentBuilder()
    .setTitle('Partial linkedin clone application')
    .setContact('Salahadin Dinsafa', '', 'salahadindinsafa@gmail.com')
    .setVersion('1.0.0')
    .setExternalDoc('Linkedin', 'https://linkedin.com')
    .setLicense('MIT', 'https://api.openapi.org/MIT')
    .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port: number = +process.env.port || 3000;
  await app.listen(port);
}


bootstrap();
