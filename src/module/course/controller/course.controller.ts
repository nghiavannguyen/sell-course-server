import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CourseService } from '../service/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';

@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth()
export class CourseController {
  constructor(private readonly coursesService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'số trang hiện tại',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'giới hạn số bản ghi trên mỗi trang',
    example: '10',
  })
  findAll(@Query() dto: PaginationDto) {
    return this.coursesService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
