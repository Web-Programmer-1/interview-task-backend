import { PrismaService } from '../prisma/prisma.service';
export declare class SurahService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        nameArabic: string;
        nameSimple: string;
        nameComplex: string;
        nameTranslation: string;
        revelationPlace: string;
        versesCount: number;
        pageStart: number;
        pageEnd: number;
        bismillahPre: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nameArabic: string;
        nameSimple: string;
        nameComplex: string;
        nameTranslation: string;
        revelationPlace: string;
        versesCount: number;
        pageStart: number;
        pageEnd: number;
        bismillahPre: boolean;
    }>;
}
