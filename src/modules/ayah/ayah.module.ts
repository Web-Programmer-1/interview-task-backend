import { Module } from '@nestjs/common';
import { AyahController } from './ayah.controller';
import { AyahService } from './ayah.service';

@Module({
  controllers: [AyahController],
  providers: [AyahService],
})
export class AyahModule {}
