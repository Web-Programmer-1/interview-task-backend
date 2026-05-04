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
exports.SurahService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SurahService = class SurahService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(id) {
        const surah = await this.prisma.surah.findUnique({
            where: { id },
        });
        if (!surah) {
            throw new common_1.NotFoundException(`Surah ${id} not found`);
        }
        return surah;
    }
};
exports.SurahService = SurahService;
exports.SurahService = SurahService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SurahService);
//# sourceMappingURL=surah.service.js.map