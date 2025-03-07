import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ description: 'User ID associated with the wishlist' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Course ID added to the wishlist' })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({ description: 'Date when the course was added to wishlist (ISO format)' })
  @IsNotEmpty()
  @IsDateString()
  addedAt: string;
}
