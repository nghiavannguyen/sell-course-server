import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the category' })
  @IsOptional()
  @IsString()
  description?: string;
}
