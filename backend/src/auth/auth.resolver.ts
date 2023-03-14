import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthLoginReturn } from './interfaces/auth.login.return';
import { AuthLoginInput } from './interfaces/auth.loginInputs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AuthLoginReturn)
  async login(
    @Args('loginCredentials')
    _loginCredentials: AuthLoginInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async logout(@CurrentUser() user: User) {
    return 'user';
  }
}
