import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/lib/entity/course/enrollment.entity';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../dto/update-enrollment.dto';
import { Course } from 'src/lib/entity/course/course.entity';
import { UserService } from 'src/module/user/service/user.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { PaginationService } from 'src/lib/shared/service/pagination.service';
import { PaginationResult } from 'src/lib/shared/interface/pagination-result.interface';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    private readonly userService: UserService,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const user = await this.userService.findOne(createEnrollmentDto.userId);
    const course = await this.courseRepo.findOne({
      where: { id: createEnrollmentDto.courseId },
    });
    const enrollment = this.enrollmentRepository.save({
      user: user,
      course: course,
      progress: createEnrollmentDto.progress,
    });
    return enrollment;
  }

  async findAll(
    paginateQuery: PaginationDto,
  ): Promise<PaginationResult<Enrollment>> {
    return await this.paginationService.paginate<Enrollment>(
      this.enrollmentRepository,
      paginateQuery,
    );
  }

  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });
    if (!enrollment) {
      throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
    }
    return enrollment;
  }

  async update(
    id: string,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    try {
      const enrollment = await this.findOne(id);
      if (!enrollment) {
        throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
      }
      enrollment.progress = updateEnrollmentDto.progress;
      enrollment.course = await this.courseRepo.findOne({
        where: { id: updateEnrollmentDto.courseId },
      });
      enrollment.user = await this.userService.findOne(
        updateEnrollmentDto.userId,
      );

      return await this.enrollmentRepository.save(enrollment);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepository.remove(enrollment);
  }
}
