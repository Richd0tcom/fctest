import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbSetup } from './db/setup';

async function bootstrap() {
  dbSetup();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['*'],
  });
  await app.listen(2121);
}
bootstrap();
