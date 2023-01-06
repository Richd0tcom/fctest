import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('brands/:brandId')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post('addons')
  create(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Body() createAddonDto: CreateAddonDto,
  ) {
    return this.addonsService.create(brandId, createAddonDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('addons')
  findAll(@Param('brandId', new ParseIntPipe()) brandId: number) {
    return this.addonsService.findAllAddonsForSpecificBrand(brandId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('addons/:addonId')
  findOne(@Param('id') id: number) {
    return this.addonsService.findAddonById(id, id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Patch('addons/:addonId')
  update(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.update(brandId, addonId, updateAddonDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete('addons/:addonId')
  remove(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    return this.addonsService.remove(brandId, addonId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post('addon-categories')
  createAddonCategory(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Body() createAddonDto: CreateAddonDto,
  ) {
    return this.addonsService.createAddonCategory(brandId, createAddonDto);
  }
}
