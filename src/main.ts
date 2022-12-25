import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';

import * as morgan from 'morgan';

import { AppModule } from './app.module';

const logStream = fs.createWriteStream('api.log', { flags: 'a' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(morgan('combined', { stream: logStream }));
  await app.listen(3000);
}


bootstrap();
