"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const ALQURAN = 'https://api.alquran.cloud/v1';
const QURAN_COM = 'https://api.quran.com/api/v4';
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`HTTP ${res.status}: ${url}`);
    return res.json();
}
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
    console.log('🕌 Starting Quran DB Seed...\n');
    console.log('📚 Fetching surah metadata from Quran.com...');
    const chaptersData = await fetchJSON(`${QURAN_COM}/chapters?language=en`);
    const chapters = chaptersData.chapters;
    console.log(`✅ Got ${chapters.length} surahs\n`);
    console.log('💾 Seeding Surahs...');
    for (const ch of chapters) {
        try {
            await prisma.surah.upsert({
                where: { id: ch.id },
                update: {
                    nameArabic: ch.name_arabic,
                    nameSimple: ch.name_simple,
                    nameTranslation: ch.translated_name?.name ?? '',
                    versesCount: ch.verses_count,
                },
                create: {
                    id: ch.id,
                    nameArabic: ch.name_arabic,
                    nameSimple: ch.name_simple,
                    nameComplex: ch.name_complex,
                    nameTranslation: ch.translated_name?.name ?? '',
                    revelationPlace: ch.revelation_place,
                    versesCount: ch.verses_count,
                    pageStart: ch.pages?.[0] ?? 1,
                    pageEnd: ch.pages?.[1] ?? 1,
                    bismillahPre: ch.bismillah_pre ?? true,
                },
            });
        }
        catch (e) {
            console.error(`Failed to seed surah ${ch.id}:`, e.message);
        }
    }
    console.log('✅ Surahs seeded!\n');
    console.log('📖 Seeding Ayahs (Arabic + English)...');
    let totalAyahs = 0;
    for (let surahId = 1; surahId <= 114; surahId++) {
        try {
            const [arabicData, transData] = await Promise.all([
                fetchJSON(`${ALQURAN}/surah/${surahId}/quran-uthmani`),
                fetchJSON(`${ALQURAN}/surah/${surahId}/en.sahih`),
            ]);
            const arabicAyahs = arabicData.data?.ayahs ?? [];
            const transAyahs = transData.data?.ayahs ?? [];
            for (let i = 0; i < arabicAyahs.length; i++) {
                const arabic = arabicAyahs[i];
                const trans = transAyahs[i];
                const verseKey = `${surahId}:${arabic.numberInSurah}`;
                await prisma.ayah.upsert({
                    where: { verseKey },
                    update: {
                        textUthmani: arabic.text,
                        translation: trans?.text ?? '',
                    },
                    create: {
                        id: arabic.number,
                        surahId,
                        verseNumber: arabic.numberInSurah,
                        verseKey,
                        textUthmani: arabic.text,
                        translation: trans?.text ?? '',
                        juzNumber: arabic.juz,
                        pageNumber: arabic.page,
                    },
                });
                totalAyahs++;
            }
            process.stdout.write(`  ✓ Surah ${surahId}/114 — Total Ayahs: ${totalAyahs}\r`);
            await sleep(500);
        }
        catch (err) {
            console.error(`\n❌ Error on Surah ${surahId}:`, err.message);
        }
    }
    console.log(`\n\n✅ Done! Seeded ${totalAyahs} ayahs across 114 surahs.\n`);
    console.log('🎉 Database is ready!');
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map