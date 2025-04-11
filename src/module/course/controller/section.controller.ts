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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { SectionService } from '../service/section.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';

@ApiTags('sections')
@Controller('sections')
@ApiBearerAuth()

export class SectionController {
  constructor(private readonly sectionsService: SectionService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  @Post('bulk')
  createBulk(@Body() createSectionDto: CreateSectionDto[]) {
    return this.sectionsService.createBulk(createSectionDto);
  }

  @Get()
  findAll(@Query() paginateQuery: PaginationDto) {
    return this.sectionsService.findAll(paginateQuery);
  }

  @Get('course/:id')
  findByCourseId(@Param('id') id: string) {
    return this.sectionsService.findByCourseId(id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionsService.update(id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(id);
  }
}
