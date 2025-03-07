import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'User ID for the enrollment' })
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @ApiProperty({ description: 'Course ID for the enrollment' })
  @IsNotEmpty()
  @IsNumber()
  courseId: string;

  @ApiProperty({ description: 'Progress of the enrollment' })
  @IsNotEmpty()
  @IsNumber()
  progress: number;

  @ApiProperty({ description: 'Enrollment date (ISO string)' })
  @IsNotEmpty()
  @IsDateString()
  enrolledAt: string;
}
