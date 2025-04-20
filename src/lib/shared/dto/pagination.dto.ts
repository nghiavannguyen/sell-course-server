// pagination.dto.ts
import { IsInt, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1; // Mặc định là trang 1

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    name: 'search',
    description: 'Tìm kiếm theo title, name (không bắt buộc)',
  })
  search?: string; // Tìm kiếm theo tên khóa học
}
