import { CourseController } from './controller/course.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/lib/entity/course/category.entity';
import { CourseMaterial } from 'src/lib/entity/course/course-material.entity';
import { Course } from 'src/lib/entity/course/course.entity';
import { Enrollment } from 'src/lib/entity/course/enrollment.entity';
import { Lesson } from 'src/lib/entity/course/lesson.entity';
import { Review } from 'src/lib/entity/course/review.entity';
import { Section } from 'src/lib/entity/course/section.entity';
import { Wishlist } from 'src/lib/entity/course/wish-list.entity';
import { CourseService } from './service/course.service';
import { EnrollmentController } from './controller/enrollment.controller';
import { EnrollmentService } from './service/enrollment.service';
import { UserModule } from '../user/user.module';
import { CategoriesController as CategoryController } from './controller/category.controller';
import { CategoryService as CategoryService } from './service/category.service';
import { SectionService as SectionService } from './service/section.service';
import { SectionController } from './controller/section.controller';
import { CourseMaterialService } from './service/course-material.service';
import { CourseMaterialsController as CourseMaterialController } from './controller/course-material.controller';
import { WishlistController } from './controller/wishlist.controller';
import { WishlistService } from './service/wishlist.service';
import { ReviewsService as ReviewService } from './service/review.service';
import { ReviewsController as ReviewController } from './controller/review.controller';
import { LessonController } from './controller/lesson.controller';
import { LessonService } from './service/lesson.service';
import { SharedModule } from 'src/lib/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Category,
      Enrollment,
      Section,
      Lesson,
      CourseMaterial,
      Wishlist,
      Review,
    ]),
    UserModule,
    SharedModule
  ],
  controllers: [
    CourseController,
    EnrollmentController,
    CategoryController,
    SectionController,
    CourseMaterialController,
    WishlistController,
    ReviewController,
    LessonController,
  ],
  providers: [
    CourseService,
    EnrollmentService,
    CategoryService,
    SectionService,
    CourseMaterialService,
    WishlistService,
    ReviewService,
    LessonService,
  ],
})
export class CourseModule {}
