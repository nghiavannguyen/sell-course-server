// pagination.dto.ts
import { IsInt, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({
    required: false,
    name: 'page',
    description: 'trang hiện tại',
  })
  page?: number = 1; // Mặc định là trang 1

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({
    required: false,
    name: 'limit',
    description: 'giới hạn số lượng bản ghi trả về',
  })
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    name: 'search',
    description: 'Tìm kiếm ',
  })
  search?: string; // Tìm kiếm theo tên khóa học
}
