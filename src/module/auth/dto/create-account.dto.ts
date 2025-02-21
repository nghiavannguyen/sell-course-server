import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Tên người dùng' })
  username: string;
  @IsString()
  @ApiProperty({ description: 'Mật khẩu của người dùng' })
  password: string;
  @IsString()
  @ApiProperty({ description: 'Role của người dùng' })
  role: string;
}
