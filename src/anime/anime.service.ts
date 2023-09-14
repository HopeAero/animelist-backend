import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnimeService {

  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>
  ) {}

  async create(createAnimeDto: CreateAnimeDto) {
    try {
      const anime = await this.animeRepository.create(createAnimeDto)
      return this.animeRepository.save(anime);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const animes = await this.animeRepository.find();
      return animes;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const anime = await this.animeRepository.findOneBy({id});
      return anime;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto) {
    try {
      return await this.animeRepository.update({id}, updateAnimeDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const anime = await this.animeRepository.softDelete({id});
      // const anime = await this.animeRepository.softRemove({id});
      return anime;
    } catch (error) {
      console.log(error);
    }
  }
}
