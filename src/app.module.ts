import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './core/addons/addons.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    DbModule,
    AddonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
