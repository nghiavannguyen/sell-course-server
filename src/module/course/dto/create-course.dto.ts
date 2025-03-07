import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'Title of the course' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the course' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Category ID of the course' })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'Instructor ID for the course' })
  @IsNotEmpty()
  @IsUUID()
  instructorId: string;

  @ApiPropertyOptional({ description: 'Preview video URL' })
  @IsOptional()
  @IsString()
  previewVideoUrl?: string;

  @ApiProperty({ description: 'Price before discount' })
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;

  @ApiProperty({ description: 'Price after discount' })
  @IsNotEmpty()
  @IsNumber()
  priceAfterDiscount: number;

  @ApiPropertyOptional({ description: 'Average rating of the course' })
  @IsOptional()
  @IsNumber()
  averageRating?: number;
}
