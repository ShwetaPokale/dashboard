import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    if (!username || !password) {
      return { Status: false, message: 'Username and password are required' };
    }
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return { Status: false, message: 'Invalid username or password' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { Status: false, message: 'Invalid username or password' };
    }
    const result = await this.usersService.findOne(user.userid);

    return { Status: true, message: 'Login successfully', data: result };
  }
}
