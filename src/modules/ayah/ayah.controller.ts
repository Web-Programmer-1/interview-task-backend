import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AyahService } from './ayah.service';

@Controller()
export class AyahController {
  constructor(private readonly ayahService: AyahService) {}

  // GET /api/surahs/:id/ayahs
  @Get('surahs/:id/ayahs')
  findBySurah(@Param('id', ParseIntPipe) id: number) {
    return this.ayahService.findBySurah(id);
  }

  // GET /api/ayahs/:verseKey  (e.g. 1:1)
  @Get('ayahs/:verseKey')
  findOne(@Param('verseKey') verseKey: string) {
    return this.ayahService.findOne(verseKey);
  }
}
