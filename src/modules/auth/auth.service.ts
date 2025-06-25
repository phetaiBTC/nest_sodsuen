import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { comparePassword } from 'src/common/util/bcrypt.util';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async login(createAuthDto: CreateAuthDto) {
    const isUser = await this.usersService.findOneByEmail(createAuthDto.email);
    if (!isUser) throw new UnauthorizedException('Email or password is incorrect');
    const isPassword = await comparePassword(createAuthDto.password, isUser.password);
    if (!isPassword) throw new UnauthorizedException('Email or password is incorrect');
    const payload = { id: isUser.id, role: isUser.role.name };
    return { message: 'Login successfully',access_token: this.jwtService.sign(payload) };
  }
  async profile(user: any) {
    // return this.usersService.findOne(user.id);
    return user
  }

}
