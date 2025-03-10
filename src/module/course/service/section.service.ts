import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/lib/entity/course/section.entity';
import { Repository } from 'typeorm';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { CourseService } from './course.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { PaginationService } from 'src/lib/shared/service/pagination.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly courseService: CourseService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    try {
      const section = this.sectionRepository.create({
        title: createSectionDto.title,
        order: createSectionDto.order,
        description: createSectionDto.description,
        course: await this.courseService.findOne(createSectionDto.courseId),
      });
      return await this.sectionRepository.save(section);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
  }
  }
  async createBulk(createSectionDto: CreateSectionDto[]): Promise<Section[]> {
    const sections = Promise.all(
      createSectionDto.map(async (section) => {
        return await this.create(section);
      }),
    );
    return sections;
  }

  async findByCourseId(id: string): Promise<Section[]> {
    return this.sectionRepository.find({
      where: { course: { id: id } },
    });
  }

  async findAll(paginateDto: PaginationDto) {
    return await this.paginationService.paginate<Section>(
      this.sectionRepository,
      paginateDto,
    );
  }

  async findOne(id: string): Promise<Section> {
    const section = await this.sectionRepository.findOne({ where: { id } });
    if (!section) {
      throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
    }
    return section;
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const section = await this.findOne(id);
    if (!section) {
      throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
    }
    try {
      section.title = updateSectionDto.title;

      section.order = updateSectionDto.order;
      section.description = updateSectionDto.description;
      return await this.sectionRepository.save(section);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepository.remove(section);
  }
}
