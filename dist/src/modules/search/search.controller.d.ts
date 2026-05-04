import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: string, limit: number): Promise<{
        verse_key: string;
        surah_id: number;
        surah_name: string;
        surah_arabic: string;
        verse_number: number;
        arabic_text: string;
        translation: string;
    }[]>;
}
