import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lib/entity/course/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { SectionService } from './section.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { PaginationService } from 'src/lib/shared/service/pagination.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly sectionService: SectionService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const findSection = await this.sectionService.findOne(
      createLessonDto.sectionId,
    );
    const lesson = this.lessonRepository.create({
      title: createLessonDto.title,
      videoUrl: createLessonDto.videoUrl,
      duration: createLessonDto.duration,
      order: createLessonDto.order,
      description: createLessonDto.description,
      section: findSection,
    });
    return await this.lessonRepository.save(lesson);
  }

  async createBulk(createLessonDto: CreateLessonDto[]): Promise<Lesson[]> {
    const lessons = await Promise.all(
      createLessonDto.map(async (lesson) => {
        return await this.create(lesson);
      }),
    );
    return lessons;
  }
  async findBySectionId(sectionId: string): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { section: { id: sectionId } },
    });
  }

  async findAll(paginateQuery: PaginationDto) {
    return await this.paginationService.paginate<Lesson>(
      this.lessonRepository,
      paginateQuery,
    );
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    if (!lesson) {
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    }
    try {
      lesson.description = updateLessonDto.description;
      lesson.duration = updateLessonDto.duration;
      lesson.order = updateLessonDto.order;
      lesson.title = updateLessonDto.title;
      lesson.videoUrl = updateLessonDto.videoUrl;
      lesson.section = await this.sectionService.findOne(
        updateLessonDto.sectionId,
      );
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
