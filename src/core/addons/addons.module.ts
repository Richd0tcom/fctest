import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';
import { Addon, AddonCategory } from './entities/addon.entity';

@Module({
  imports: [],
  controllers: [AddonsController],
  providers: [AddonsService, Addon, AddonCategory],
})
export class AddonsModule {}
