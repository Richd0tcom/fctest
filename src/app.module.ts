import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './core/addons/addons.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { PupsModule } from './pups/pups.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    DbModule,
    AddonsModule,
    AuthModule,
    PupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
