import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  Logger,
  Query,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/lib/shared/constant/meta-data';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { UserRole } from 'src/lib/shared/constant/enum_constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Req() req, @Query() PaginationDto: PaginationDto) {
    new Logger.log('req.user ', req.user);

    return this.userService.findAll(PaginationDto);
  }

  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
