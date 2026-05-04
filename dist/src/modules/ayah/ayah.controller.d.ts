import { AyahService } from './ayah.service';
export declare class AyahController {
    private readonly ayahService;
    constructor(ayahService: AyahService);
    findBySurah(id: number): Promise<{
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
