import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateCourseMaterialDto {
  @ApiProperty({ description: 'Course ID to which this material belongs' })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({ description: 'Title of the material' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'File URL of the material' })
  @IsNotEmpty()
  @IsString()
  fileUrl: string;

  @ApiProperty({ description: 'File type of the material' })
  @IsNotEmpty()
  @IsString()
  fileType: string;

  @ApiProperty({ description: 'Uploaded date in ISO format' })
  @IsNotEmpty()
  @IsDateString()
  uploadedAt: string;
}
