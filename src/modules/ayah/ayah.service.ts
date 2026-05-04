import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AyahService {
  constructor(private readonly prisma: PrismaService) {}

  // GET /api/surahs/:id/ayahs — all ayahs of a surah
  async findBySurah(surahId: number) {
    // Verify surah exists
    const surah = await this.prisma.surah.findUnique({ where: { id: surahId } });
    if (!surah) throw new NotFoundException(`Surah ${surahId} not found`);

    return this.prisma.ayah.findMany({
      where: { surahId },
      orderBy: { verseNumber: 'asc' },
      select: {
        id: true,
        verseNumber: true,
        verseKey: true,
        textUthmani: true,
        translation: true,
        juzNumber: true,
        pageNumber: true,
      },
    });
  }

  // GET /api/ayahs/:verseKey — single ayah by verse key e.g. "1:1"
  async findOne(verseKey: string) {
    const ayah = await this.prisma.ayah.findUnique({
      where: { verseKey },
      include: {
        surah: {
          select: {
            id: true,
            nameSimple: true,
            nameArabic: true,
          },
        },
      },
    });

    if (!ayah) throw new NotFoundException(`Ayah ${verseKey} not found`);
    return ayah;
  }
}
