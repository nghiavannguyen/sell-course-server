import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCourseMaterialDto } from '../dto/create-course-material.dto';
import { UpdateCourseMaterialDto } from '../dto/update-course-material.dto';
import { CourseMaterialService } from '../service/course-material.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';

@ApiTags('course-materials')
@Controller('course-materials')
@ApiBearerAuth()
export class CourseMaterialsController {
  constructor(private readonly materialsService: CourseMaterialService) {}

  @Post()
  create(@Body() createDto: CreateCourseMaterialDto) {
    return this.materialsService.create(createDto);
  }

  @Get()
  findAll(@Query() paginateQuery: PaginationDto) {
    return this.materialsService.findAll(paginateQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCourseMaterialDto) {
    return this.materialsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }
}
