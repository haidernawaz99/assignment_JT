import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { AdminExpirationReturn } from './dtos/admin.expiration.return';
import { SetCategoriesInputParams } from './dtos/admin.setCategoriesInput';
import { SetExpirationInputParams } from './dtos/admin.setExpirationInput';
import { AdminCategoriesReturn } from './dtos/admin.categories.return';
import { AdminUserViewReturn } from './dtos/admin.userView.return';
import { SetUserViewInputParams } from './dtos/admin.setUserViewInput.return';

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

  @Mutation(() => AdminCategoriesReturn)
  async setCategories(@Args('input') input: SetCategoriesInputParams) {
    return { categories: this.adminService.setCategories(input) };
  }

  @Query(() => [AdminUserViewReturn])
  async getUserView() {
    return this.adminService.getUserViewConfig();
  }

  @Mutation(() => [AdminUserViewReturn])
  async setUserView(@Args('input') input: SetUserViewInputParams) {
    return this.adminService.setUserViewConfig(input);
  }
}
