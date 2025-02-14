import { IsEmail, isEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/lib/entity/user/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(['admin', 'student'])
  role: string;
}
