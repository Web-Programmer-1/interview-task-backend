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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyahController = void 0;
const common_1 = require("@nestjs/common");
const ayah_service_1 = require("./ayah.service");
let AyahController = class AyahController {
    constructor(ayahService) {
        this.ayahService = ayahService;
    }
    findBySurah(id) {
        return this.ayahService.findBySurah(id);
    }
    findOne(verseKey) {
        return this.ayahService.findOne(verseKey);
    }
};
exports.AyahController = AyahController;
__decorate([
    (0, common_1.Get)('surahs/:id/ayahs'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AyahController.prototype, "findBySurah", null);
__decorate([
    (0, common_1.Get)('ayahs/:verseKey'),
    __param(0, (0, common_1.Param)('verseKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AyahController.prototype, "findOne", null);
exports.AyahController = AyahController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [ayah_service_1.AyahService])
], AyahController);
//# sourceMappingURL=ayah.controller.js.map