// src/common/services/bcrypt.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * Băm mật khẩu với số lần salt (mặc định là 10)
   */
  async hashPassword(password: string, saltRounds = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * So sánh mật khẩu người dùng nhập vào với hash đã lưu
   */
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
