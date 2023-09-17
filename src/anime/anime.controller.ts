import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiFile } from 'src/common/decorator/file-decorator';
@ApiTags('anime')
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage : diskStorage({
            destination : './uploads',
            filename : (req, file, cb) => {
              cb(null, file.originalname);
            }
        })
      }
    )
  )
  @Auth(UserRole.ADMIN)
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto, @UploadedFile() file: Express.Multer.File) {
    return this.animeService.create(createAnimeDto, file);
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
  update(@Param('id') id: number, @Body() updateAnimeDto: UpdateAnimeDto, @UploadedFile() file: Express.Multer.File) {
    return this.animeService.update(id, updateAnimeDto, file);
  }

  @Auth(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.animeService.remove(id);
  }
}
