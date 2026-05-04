import { SurahService } from './surah.service';
export declare class SurahController {
    private readonly surahService;
    constructor(surahService: SurahService);
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
