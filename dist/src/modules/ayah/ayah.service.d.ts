import { PrismaService } from '../prisma/prisma.service';
export declare class AyahService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findBySurah(surahId: number): Promise<{
        id: number;
        verseKey: string;
        verseNumber: number;
        textUthmani: string;
        translation: string;
        juzNumber: number;
        pageNumber: number;
    }[]>;
    findOne(verseKey: string): Promise<{
        surah: {
            id: number;
            nameArabic: string;
            nameSimple: string;
        };
    } & {
        id: number;
        verseKey: string;
        surahId: number;
        verseNumber: number;
        textUthmani: string;
        translation: string;
        juzNumber: number;
        pageNumber: number;
    }>;
}
