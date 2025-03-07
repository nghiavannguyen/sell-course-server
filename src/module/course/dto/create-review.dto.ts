import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'User ID who writes the review' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Course ID for which review is written' })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({ description: 'Rating value' })
  @IsNotEmpty()
  @IsInt()
  rating: number;

  @ApiPropertyOptional({ description: 'Comment for the review' })
  @IsOptional()
  @IsString()
  comment?: string;
}
