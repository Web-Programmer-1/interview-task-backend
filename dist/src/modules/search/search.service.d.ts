import { PrismaService } from '../prisma/prisma.service';
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(query: string, limit?: number): Promise<{
        verse_key: string;
        surah_id: number;
        surah_name: string;
        surah_arabic: string;
        verse_number: number;
        arabic_text: string;
        translation: string;
    }[]>;
}
