import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import {ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/users/entities/user.entity';
@ApiTags('anime')
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Auth(UserRole.ADMIN)
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @Auth(UserRole.USER)
  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Auth(UserRole.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animeService.findOne(id);
  }

  @Auth(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(id, updateAnimeDto);
  }

  @Auth(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.animeService.remove(id);
  }
}
