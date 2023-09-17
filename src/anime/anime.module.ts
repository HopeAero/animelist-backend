import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { Anime } from './entities/anime.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from 'src/list/list.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Anime]), ListModule
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
  exports: [TypeOrmModule]
})
export class AnimeModule {}
