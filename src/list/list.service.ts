import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from 'src/anime/entities/anime.entity';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { UserActiveInterface } from 'src/common/interface/user-active-interface';

@Injectable()
export class ListService {

  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,

    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto, user: UserActiveInterface) {
    return await this.listRepository.save({
      ...createListDto,
      userId: user.id,
    })
  }

  async removeAnimeFromList(listId: number, animeId: number, user: UserActiveInterface) {
    const list = await this.listRepository.findOne({
      relations: ['anime'],
      where: { id: listId, userId: user.id },
    });
  
    if (!list) {
      throw new NotFoundException('List not found');
    }
  
    const anime = await this.animeRepository.findOneBy({ id: animeId });
  
    if (!anime) {
      throw new NotFoundException('Anime not found');
    }
  
    // Ahora, realiza la lógica para eliminar el anime de la lista
    const updatedAnimeList = list.anime.filter(animeItem => animeItem.id !== animeId);
  
    // Actualiza la propiedad `anime` de la lista con el nuevo contenido
    list.anime = updatedAnimeList;
  
    // Guarda la lista actualizada en la base de datos
    return await this.listRepository.save(list);
  
  }


  async addAnimeToList(listId: number, animeId: number, user: UserActiveInterface) {
    const list = await this.listRepository.findOneBy({ id: listId, userId: user.id });
    const anime = await this.animeRepository.findOneBy({ id: animeId });
  
    if (!list || !anime) {
      throw new NotFoundException('List or anime not found');
    }
  
    // Asegúrate de que la propiedad "anime" de la lista sea un array antes de agregar el anime
    if (!list.anime) {
      list.anime = [];
    }
  
    // Agrega el anime a la lista
    list.anime.push(anime);
  
    // Guarda la lista actualizada en la base de datos
    return await this.listRepository.save(list);
  
  }
  
  async findAll() {
    return await this.listRepository.find({
      relations: ['anime'],
    });
  }

  async findOne(id: number) {
    return await this.listRepository.findOneBy({id});
  }

  async update(id: number, updateListDto: UpdateListDto, user: UserActiveInterface) {
    const list = await this.listRepository.findOneBy({id, userId: user.id});

    if (!list) {
      throw new NotFoundException('List not found');
    }

    return await this.animeRepository.update({id}, updateListDto);
  }

  async remove(id: number, user: UserActiveInterface) {
    return await this.listRepository.softDelete({id, userId: user.id});
  }
}
