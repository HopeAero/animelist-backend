import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    try{
      const user = await this.userRepository.findOneBy({id});
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update({id}, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.softDelete({id});
      // const user = await this.userRepository.softRemove({id});
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
