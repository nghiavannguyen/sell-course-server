import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({ description: 'Course ID to which this section belongs' })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({ description: 'Title of the section' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Order of the section' })
  @IsNotEmpty()
  @IsInt()
  order: number;

  @ApiPropertyOptional({ description: 'Description of the section' })
  @IsOptional()
  @IsString()
  description?: string;
}
