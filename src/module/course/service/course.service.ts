import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/lib/entity/course/course.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Category } from 'src/lib/entity/course/category.entity';
import { UserService } from 'src/module/user/service/user.service';
import { PaginationService } from 'src/lib/shared/service/pagination.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { title } from 'process';
import { PaginationResult } from 'src/lib/shared/interface/pagination-result.interface';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly userService: UserService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const findCourse = await this.categoryRepository.findOne({
        where: { id: createCourseDto.categoryId },
      });
      const findInstructor = await this.userService.findOneExcludePassword(
        createCourseDto.instructorId,
      );
      if (!findCourse) {
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      }
      if (!findInstructor) {
        throw new HttpException('Instructor not found', HttpStatus.BAD_REQUEST);
      }
      const course = this.courseRepository.save({
        title: createCourseDto.title,
        description: createCourseDto.description,
        category: findCourse,
        instructor: findInstructor,
        previewVideoUrl: createCourseDto.previewVideoUrl,
        priceBeforeDiscount: createCourseDto.priceBeforeDiscount,
        priceAfterDiscount: createCourseDto.priceAfterDiscount,
        averageRating: createCourseDto.averageRating,
      });
      return course;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async findAll(
    paginateDto: PaginationDto,
    options?: FindManyOptions<Course>,
  ): Promise<PaginationResult<Course>> {
    return await this.paginationService.paginate<Course>(
      this.courseRepository,
      paginateDto,
      options,
    );
  }

  async filterCourse(paginateDto: PaginationDto) {
    return await this.paginationService.paginate<Course>(
      this.courseRepository,
      paginateDto,
    );
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    course.title = updateCourseDto.title;
    course.description = updateCourseDto.description;
    course.category = await this.categoryRepository.findOne({
      where: { id: updateCourseDto.categoryId },
    });
    course.instructor = await this.userService.findOneExcludePassword(
      updateCourseDto.instructorId,
    );
    course.previewVideoUrl = updateCourseDto.previewVideoUrl;
    course.priceBeforeDiscount = updateCourseDto.priceBeforeDiscount;
    course.priceAfterDiscount = updateCourseDto.priceAfterDiscount;
    course.averageRating = updateCourseDto.averageRating;
    return await this.courseRepository.save(course);
  }

  async remove(id: string): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }
}
