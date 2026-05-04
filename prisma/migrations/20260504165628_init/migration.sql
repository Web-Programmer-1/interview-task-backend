-- CreateTable
CREATE TABLE "surahs" (
    "id" INTEGER NOT NULL,
    "nameArabic" TEXT NOT NULL,
    "nameSimple" TEXT NOT NULL,
    "nameComplex" TEXT NOT NULL,
    "nameTranslation" TEXT NOT NULL,
    "revelationPlace" TEXT NOT NULL,
    "versesCount" INTEGER NOT NULL,
    "pageStart" INTEGER NOT NULL,
    "pageEnd" INTEGER NOT NULL,
    "bismillahPre" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "surahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ayahs" (
    "id" INTEGER NOT NULL,
    "surahId" INTEGER NOT NULL,
    "verseNumber" INTEGER NOT NULL,
    "verseKey" TEXT NOT NULL,
    "textUthmani" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "juzNumber" INTEGER NOT NULL,
    "pageNumber" INTEGER NOT NULL,

    CONSTRAINT "ayahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "juzs" (
    "id" INTEGER NOT NULL,
    "juzNumber" INTEGER NOT NULL,
    "firstVerseKey" TEXT NOT NULL,
    "lastVerseKey" TEXT NOT NULL,
    "versesCount" INTEGER NOT NULL,

    CONSTRAINT "juzs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ayahs_verseKey_key" ON "ayahs"("verseKey");

-- CreateIndex
CREATE INDEX "ayahs_surahId_idx" ON "ayahs"("surahId");

-- CreateIndex
CREATE INDEX "ayahs_verseKey_idx" ON "ayahs"("verseKey");

-- CreateIndex
CREATE UNIQUE INDEX "juzs_juzNumber_key" ON "juzs"("juzNumber");

-- AddForeignKey
ALTER TABLE "ayahs" ADD CONSTRAINT "ayahs_surahId_fkey" FOREIGN KEY ("surahId") REFERENCES "surahs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
