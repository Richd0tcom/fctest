import { Global, Module } from '@nestjs/common';
import { Addon, AddonCategory } from 'src/core/addons/entities/addon.entity';

const models = [Addon, AddonCategory];
const providers = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DbModule {}
