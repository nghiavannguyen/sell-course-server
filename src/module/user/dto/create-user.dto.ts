import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/lib/entity/user/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Tên người dùng' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Mật khẩu của người dùng' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Email của người dùng' })
  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @ApiProperty({
    description: 'Vai trò của người dùng',
    enum: UserRole,
    example: UserRole.STUDENT,
  })
  role: string;
}
