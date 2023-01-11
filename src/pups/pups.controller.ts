import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { PupsService } from './pups.service';
import { Response } from 'express';

@Controller('pups')
export class PupsController {
  constructor(private readonly pupsService: PupsService) {}

  @Get()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="talentReport.pdf"')
  async generateReport(@Res({ passthrough: true }) response: Response) {
    const report = {};
    const prom = await this.pupsService.pdfGeneratorForReport(report);
    return new StreamableFile(prom);
  }
}
