import { Module } from '@nestjs/common';
import { PupsService } from './pups.service';
import { PupsController } from './pups.controller';

@Module({
  controllers: [PupsController],
  providers: [PupsService]
})
export class PupsModule {}
