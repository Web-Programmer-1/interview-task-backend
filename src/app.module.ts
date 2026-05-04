import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SurahModule } from './modules/surah/surah.module';
import { AyahModule } from './modules/ayah/ayah.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    // Config — load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    PrismaModule,

    // Feature modules
    SurahModule,
    AyahModule,
    SearchModule,
  ],
})
export class AppModule {}
