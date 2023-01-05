import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { Addon, AddonCategory } from './entities/addon.entity';
import { ModelClass } from 'objection';

@Injectable()
export class AddonsService {
  constructor(@Inject('Addon') private addonModel: ModelClass<Addon>) {}
  async create(brandId: number, createAddonDto: CreateAddonDto) {
    const data = { brand_id: brandId, ...createAddonDto };
    return await this.addonModel.query().insert(data).returning('*');
  }

  async findAllAddonsForSpecificBrand(brandId: number) {
    return await this.addonModel.query().where('brand_id', brandId);
  }

  async findAddonById(brandId: number, addonId: number) {
    return await this.addonModel
      .query()
      .findById(addonId)
      .where('brand_id', brandId);
  }

  async update(
    brandId: number,
    addonId: number,
    updateAddonDto: UpdateAddonDto,
  ) {
    return await this.addonModel
      .query()
      .patch(updateAddonDto)
      .where('id', addonId)
      .where('brand_id', brandId)
      .returning('*');
  }

  async remove(brandId: number, addonId: number) {
    try {
      await this.addonModel
        .query()
        .delete()
        .where('id', addonId)
        .where('brand_id', brandId);

      return {
        status: 'success',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
