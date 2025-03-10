import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { LessonService } from '../service/lesson.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';

@ApiTags('lessons')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonsService: LessonService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }
  @Post('/bulk')
  createBulk(@Body() createLessonDto: CreateLessonDto[]) {
    return this.lessonsService.createBulk(createLessonDto);
  }

  @Get()
  findAll(@Query() paginateQuery: PaginationDto) {
    return this.lessonsService.findAll(paginateQuery);
  }

  @Get('section/:id')
  findBySectionId(@Param('id') id: string) {
    return this.lessonsService.findBySectionId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
