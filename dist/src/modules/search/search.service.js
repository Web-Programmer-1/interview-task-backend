"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SearchService = class SearchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(query, limit = 20) {
        if (!query?.trim())
            return [];
        const q = query.trim();
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
            verse_key: r.verseKey,
            surah_id: r.surahId,
            surah_name: r.surah.nameSimple,
            surah_arabic: r.surah.nameArabic,
            verse_number: r.verseNumber,
            arabic_text: r.textUthmani,
            translation: r.translation,
        }));
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map