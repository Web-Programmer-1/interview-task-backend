import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SurahService } from './surah.service';

@Controller('surahs')
export class SurahController {
  constructor(private readonly surahService: SurahService) {}

  // GET /api/surahs
  @Get()
  findAll() {
    return this.surahService.findAll();
  }

  // GET /api/surahs/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.surahService.findOne(id);
  }
}
