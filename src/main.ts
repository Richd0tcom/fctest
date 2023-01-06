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
  const PORT = process.env.PORT || 2121;
  await app.listen(PORT);
}
bootstrap();
