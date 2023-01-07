import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbSetup } from './db/setup';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dbSetup();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Food Court API')
    .setDescription('This is an API for a meal management application')
    .setVersion('1.0')
    .addTag('Food')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addServer('http://localhost:2121', 'local')
    .addServer('https://fctest-production.up.railway.app', 'production')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 2121;
  await app.listen(PORT);
}
bootstrap();
