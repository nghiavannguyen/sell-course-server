import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/lib/entity/course/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create({
      id: createDto.userId,
      rating: createDto.rating,
      comment: createDto.comment,
      course: { id: createDto.courseId } as any,
    });
    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    return review;
  }

  async update(id: string, updateDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, updateDto);
    return await this.reviewRepository.save(review);
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }
}
