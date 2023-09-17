import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Anime } from 'src/anime/entities/anime.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, Anime]),
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [TypeOrmModule]
})
export class ListModule {}
