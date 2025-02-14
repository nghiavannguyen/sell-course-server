import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/lib/entity/user/user.entity';
import { ResponseBase } from 'src/lib/shared/constant/response_base';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.name = createUserDto.name;
      user.password_hash = createUserDto.password;
      user.role = createUserDto.role as UserRole;
      return this.userRepository.save(user);
    } catch (error) {
      throw new ResponseBase('400', 'Bad Request', `${error}`);
    }
  }

  async findAll(): Promise<User[]> {
    console.log('findAll');
    console.log('this.userRepository ', await this.userRepository.find());
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id.toString() },
      });
      if (user != null) {
        return user;
      }
    } catch (e) {
      throw new ResponseBase('400', 'Bad Request', `${e}`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
