import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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

  @UseGuards(LoginAuthGuard) // <-- Checks if the credentials passed are valid, and if so, returns the user object and token.
  @Query(() => AuthLoginReturn)
  async login(
    @Args('loginCredentials')
    _loginCredentials: AuthLoginInput,
    @CurrentUser() user: UserReturn,
  ) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard) // <-- Checks if the token passed is valid, and if so, returns the user object and a **NEW** token.
  @Query(() => UserReturn)
  async logout(@CurrentUser() user: UserReturn) {
    return user;
  }
}
