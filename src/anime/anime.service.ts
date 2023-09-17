import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createAnimeDto: CreateAnimeDto, file: Express.Multer.File) {
    try {

      if (!file) {
        throw new BadRequestException('Not file found')
      }
    
      const anime = await this.animeRepository.create({
        ...createAnimeDto,
        image: process.env.DATABASE_URL + file.path.replace("\\", "/")
      })
      return this.animeRepository.save(anime);
    } catch (error) {
      console.log(error);
      return error.response
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

  async update(id: number, updateAnimeDto: UpdateAnimeDto, file: Express.Multer.File) {
    try {
      return await this.animeRepository.update({
        id
      }, {
        ...updateAnimeDto,
        image: process.env.DATABASE_URL + file.path.replace("\\", "/")
      });
    } catch (error) {
      console.log(error);
      return error.response
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
