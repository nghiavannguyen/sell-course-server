import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'Section ID to which this lesson belongs' })
  @IsNotEmpty()
  @IsString()
  sectionId: string;

  @ApiProperty({ description: 'Title of the lesson' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Video URL of the lesson' })
  @IsNotEmpty()
  @IsString()
  videoUrl: string;

  @ApiProperty({ description: 'Duration of the lesson in seconds' })
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiProperty({ description: 'Order of the lesson within the section' })
  @IsNotEmpty()
  @IsInt()
  order: number;

  @ApiPropertyOptional({ description: 'Description of the lesson' })
  @IsOptional()
  @IsString()
  description?: string;
}
