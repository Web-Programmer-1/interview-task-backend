# 🕌 Quran Interview Backend

NestJS + Prisma + PostgreSQL + TypeScript REST API

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/surahs` | All 114 surahs |
| GET | `/api/surahs/:id` | Single surah info |
| GET | `/api/surahs/:id/ayahs` | All ayahs of a surah |
| GET | `/api/ayahs/:verseKey` | Single ayah (e.g. `1:1`) |
| GET | `/api/search?q=mercy` | Search ayahs |

## 🚀 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database
Make sure PostgreSQL is running, then create the database:
```sql
CREATE DATABASE quran_db;
```

### 3. Configure .env
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/quran_db?schema=public"
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 4. Run Prisma Migration
```bash
npx prisma migrate dev --name init
```

### 5. Seed the Database (Downloads Quran data)
```bash
npm run seed
```
> ⚠️ This downloads 6236 ayahs from alquran.cloud API. Takes ~5-10 minutes.

### 6. Start Development Server
```bash
npm run start:dev
```

Server runs at: **http://localhost:3001/api**

## 🏗️ Project Structure

```
src/
├── main.ts              # Entry point (CORS, prefix, pipes)
├── app.module.ts        # Root module
├── prisma/
│   ├── prisma.service.ts  # PrismaClient wrapper
│   └── prisma.module.ts   # Global Prisma module
├── surah/
│   ├── surah.controller.ts
│   ├── surah.service.ts
│   └── surah.module.ts
├── ayah/
│   ├── ayah.controller.ts
│   ├── ayah.service.ts
│   └── ayah.module.ts
└── search/
    ├── search.controller.ts
    ├── search.service.ts
    └── search.module.ts

prisma/
├── schema.prisma        # DB schema (Surah, Ayah, Juz)
└── seed.ts              # Data seeder script
```

## 🛠️ Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript (strict)
- **ORM:** Prisma 7
- **Database:** PostgreSQL
- **Data Source:** alquran.cloud API (free)
