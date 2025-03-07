import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'User ID to whom the notification belongs' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Title of the notification' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Message content of the notification' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Indicates if the notification is read', default: false })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
