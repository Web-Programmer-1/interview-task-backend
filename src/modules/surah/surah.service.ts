import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SurahService {
  constructor(private readonly prisma: PrismaService) {}

  // GET /api/surahs — all 114 surahs
  async findAll() {
    return this.prisma.surah.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        nameArabic: true,
        nameSimple: true,
        nameComplex: true,
        nameTranslation: true,
        revelationPlace: true,
        versesCount: true,
        pageStart: true,
        pageEnd: true,
        bismillahPre: true,
      },
    });
  }

  // GET /api/surahs/:id — single surah
  async findOne(id: number) {
    const surah = await this.prisma.surah.findUnique({
      where: { id },
    });

    if (!surah) {
      throw new NotFoundException(`Surah ${id} not found`);
    }

    return surah;
  }
}
