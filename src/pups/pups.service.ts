import { Injectable } from '@nestjs/common';
import { join } from 'path';
import puppeteer from 'puppeteer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

@Injectable()
export class PupsService {
  public async pdfGeneratorForReport(report: any) {
    try {
      //   const readFile = promisify(fs.readFile);
      //   const html = await readFile(
      //     'src/providers/file-generator/html/full.html',
      //     {
      //       encoding: 'utf-8',
      //     },
      //   );
      //   const rnd = nunjucks.renderString(html, { ...report });
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(
        '<h3 class="opblock-tag no-desc" id="operations-tag-health" data-tag="health" data-is-open="true"><a class="nostyle" href="#/health"><span>health</span></a><small></small><button aria-expanded="true" class="expand-operation" title="Collapse operation"><svg class="arrow" width="20" height="20" aria-hidden="true" focusable="false"><use href="#large-arrow-up" xlink:href="#large-arrow-up"></use></svg></button></h3>',
      );
      await page.pdf({
        path: 'notiz.pdf',
        printBackground: true,
        format: 'A4',
        preferCSSPageSize: true,
      });
      console.log('pdf creation done');
      await browser.close();

      const reader = fs.createReadStream(join(process.cwd(), 'notiz.pdf'));

      return reader;
    } catch (error) {
      console.log(error);
    }
  }
}
