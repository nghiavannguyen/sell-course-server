import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../dto/update-enrollment.dto';
import { EnrollmentService } from '../service/enrollment.service';
import { PaginationDto } from 'src/lib/shared/dto/pagination.dto';
import { Public, Roles } from 'src/lib/shared/constant/meta-data';
import { UserRole } from 'src/lib/shared/constant/enum_constant';

@ApiTags(
  'enrollments (Bảng đăng ký khoá học cho biết user đã đăng ký khoá học nào)',
)
@Controller('enrollments')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get('/my-courses')
  @Roles(UserRole.STUDENT)
  findMyCourse(@Req() req: any, @Query() dto: PaginationDto) {
    return this.enrollmentService.findAll(dto, {
      where: { user: { id: req.user.userId } },
    });
  }

  @Get()
  findAll(@Query() paginateQuery: PaginationDto) {
    return this.enrollmentService.findAll(paginateQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.enrollmentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.enrollmentService.remove(id);
  }
}
