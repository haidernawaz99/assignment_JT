import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserReturn } from 'src/users/interface/user.return';
import { UsersService } from '../users/users.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: UserReturn): any {
    console.log(user.id);
    const payload = { username: user.username, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      username: user.username,
      id: user.id,
    };
  }
}
