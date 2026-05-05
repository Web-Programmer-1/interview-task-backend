import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  // GET /api/search?q=mercy&limit=20
  async search(query: string, limit = 20) {
    if (!query?.trim()) return [];

    const q = query.trim();

    // PostgreSQL full-text search using ILIKE (case-insensitive)
    // @ts-ignore
    const results = await this.prisma.ayah.findMany({
      where: {
        OR: [
          { translation: { contains: q, mode: 'insensitive' } },
          { textUthmani: { contains: q } },
          { verseKey: { contains: q } },
        ],
      },
      take: limit,
      select: {
        id: true,
        verseKey: true,
        verseNumber: true,
        textUthmani: true,
        translation: true,
        surahId: true,
        surah: {
          select: {
            nameSimple: true,
            nameArabic: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    return results.map((r) => ({
      id: r.id,
      verseKey: r.verseKey,
      verseNumber: r.verseNumber,
      textUthmani: r.textUthmani,
      translation: r.translation,
      surahId: r.surahId,
      surah: r.surah,
    }));
  }
}
