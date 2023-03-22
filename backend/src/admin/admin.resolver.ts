import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { AdminCategoriesReturn } from './dtos/admin.categories.return';
import { AdminExpirationReturn } from './dtos/admin.expiration.return';
import { SetCategoriesInputParams } from './dtos/admin.setCategoriesInput';
import { SetExpirationInputParams } from './dtos/admin.setExpirationInput';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}
  @Query(() => AdminExpirationReturn)
  async getExpirationPeriod() {
    return this.adminService.getExpiration();
  }

  @Mutation(() => AdminExpirationReturn)
  async setExpirationPeriod(@Args('input') input: SetExpirationInputParams) {
    return this.adminService.setExpiration(input);
  }

  @Query(() => AdminCategoriesReturn)
  async getCategories() {
    return { categories: this.adminService.getCategories() };
  }

  @Mutation(() => AdminCategoriesReturn)
  async setCategories(@Args('input') input: SetCategoriesInputParams) {
    return this.adminService.setCategories(input);
  }
}
