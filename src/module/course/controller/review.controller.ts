import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewsService } from '../service/review.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createDto: CreateReviewDto) {
    return this.reviewsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
