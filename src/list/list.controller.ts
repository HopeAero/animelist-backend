import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { ActiveUser } from 'src/common/decorator/active-user-decorator';
import { UserActiveInterface } from 'src/common/interface/user-active-interface';
import { AddAnimeToListDto } from './dto/add-anime.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('list')
@Auth(UserRole.USER)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto, @ActiveUser() user: UserActiveInterface) {
    return this.listService.create(createListDto, user);
  }

  @Post(':listId/add-anime')
  addAnimeToList(@Param('listId') listId: number, @Body() addAnimeToListDto: AddAnimeToListDto, @ActiveUser() user: UserActiveInterface) {
    return this.listService.addAnimeToList(listId, addAnimeToListDto.animeId, user);
  }

  @Post(':listId/remove-anime')
  removeAnimeFromListEndpoint(@Param('listId') listId: number, @Body() addAnimeToListDto: AddAnimeToListDto, @ActiveUser() user: UserActiveInterface) {
  return this.listService.removeAnimeFromList(listId, addAnimeToListDto.animeId, user);
}

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.listService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateListDto: UpdateListDto, @ActiveUser() user: UserActiveInterface) {
    return this.listService.update(id, updateListDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.listService.remove(id, user);
  }
}
