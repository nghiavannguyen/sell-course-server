import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseMaterial } from 'src/lib/entity/course/course-material.entity';
import { Repository } from 'typeorm';
import { CreateCourseMaterialDto } from '../dto/create-course-material.dto';
import { UpdateCourseMaterialDto } from '../dto/update-course-material.dto';
import { PaginationService } from 'src/lib/shared/service/pagination.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { PaginationResult } from 'src/lib/shared/interface/pagination-result.interface';
import { Course } from 'src/lib/entity/course/course.entity';
import { CourseService } from './course.service';

@Injectable()
export class CourseMaterialService {
  constructor(
    @InjectRepository(CourseMaterial)
    private readonly materialRepository: Repository<CourseMaterial>,
    private readonly courseService: CourseService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createDto: CreateCourseMaterialDto): Promise<CourseMaterial> {
    const material = this.materialRepository.create({
      title: createDto.title,
      fileUrl: createDto.fileUrl,
      fileType: createDto.fileType,
      course: await this.courseService.findOne(createDto.courseId),
    });
    return await this.materialRepository.save(material);
  }

  async findAll(
    paginateQuery: PaginationDto,
  ): Promise<PaginationResult<CourseMaterial>> {
    return await this.paginationService.paginate<CourseMaterial>(
      this.materialRepository,
      paginateQuery,
    );
  }

  async findOne(id: string): Promise<CourseMaterial> {
    const material = await this.materialRepository.findOne({ where: { id } });
    if (!material) {
      throw new HttpException(
        'Material course not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return material;
  }

  async update(
    id: string,
    updateDto: UpdateCourseMaterialDto,
  ): Promise<CourseMaterial> {
    const material = await this.findOne(id);
    if (!material) {
      throw new HttpException(
        'Material course not found',
        HttpStatus.NOT_FOUND,
      );
    }
    material.title = updateDto.title;
    material.fileUrl = updateDto.fileUrl;
    material.fileType = updateDto.fileType;
    const findCourse = await this.courseService.findOne(updateDto.courseId);
    if (!findCourse) {
      throw new HttpException('CourseId not found', HttpStatus.NOT_FOUND);
    }
    material.course = findCourse;
    return await this.materialRepository.save(material);
  }

  async remove(id: string): Promise<void> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
  }
}
