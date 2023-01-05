import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';

@Controller('brands/:brandId')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Post('addons')
  create(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Body() createAddonDto: CreateAddonDto,
  ) {
    return this.addonsService.create(brandId, createAddonDto);
  }

  @Get('addons')
  findAll(@Param('brandId', new ParseIntPipe()) brandId: number) {
    return this.addonsService.findAllAddonsForSpecificBrand(brandId);
  }

  @Get('addons/:addonId')
  findOne(@Param('id') id: number) {
    return this.addonsService.findAddonById(id, id);
  }

  @Patch('addons/:addonId')
  update(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.update(brandId, addonId, updateAddonDto);
  }

  @Delete('addons/:addonId')
  remove(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    return this.addonsService.remove(brandId, addonId);
  }
}
