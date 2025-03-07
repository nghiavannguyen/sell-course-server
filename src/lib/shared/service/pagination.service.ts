// pagination.service.ts
import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationResult } from '../interface/pagination-result.interface';

@Injectable()
export class PaginationService {
  async paginate<T>(
    repository: Repository<T>,
    paginationDto: PaginationDto,
    options: FindManyOptions<T> = {}, // Các tùy chọn bổ sung như where, relations
  ): Promise<PaginationResult<T>> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await repository.findAndCount({
      skip: (page - 1) * limit, // Bỏ qua bao nhiêu bản ghi
      take: limit, // Lấy bao nhiêu bản ghi
      ...options, // Gộp các tùy chọn như where, relations
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
