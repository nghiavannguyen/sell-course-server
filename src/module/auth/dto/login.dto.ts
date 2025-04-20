import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Tên người dùng', default: 'ad@gmail.com' })
  username: string;
  @IsString()
  @ApiProperty({ description: 'Mật khẩu của người dùng', default: 'nghia1' })
  password: string;
}
