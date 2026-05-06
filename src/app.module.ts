import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SurahModule } from './modules/surah/surah.module';
import { AyahModule } from './modules/ayah/ayah.module';
import { SearchModule } from './modules/search/search.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    PrismaModule,

    SurahModule,
    AyahModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
