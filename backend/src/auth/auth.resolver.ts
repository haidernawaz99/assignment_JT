import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserReturn } from 'src/users/interface/user.return';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthLoginReturn } from './interfaces/auth.login.return';
import { AuthLoginInput } from './interfaces/auth.loginInputs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LoginAuthGuard)
  @Mutation(() => AuthLoginReturn)
  async login(
    @Args('loginCredentials')
    _loginCredentials: AuthLoginInput,
    @CurrentUser() user: UserReturn,
  ) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserReturn)
  async logout(@CurrentUser() user: UserReturn) {
    return user;
  }
}
