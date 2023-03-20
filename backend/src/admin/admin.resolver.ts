import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AdminConfigReturn } from './dtos/admin.configuation.return';
import { GetAdminConfigInputParams } from './dtos/admin.getAdminConfigInput';
import { SetAdminConfigInputParams } from './dtos/admin.setAdminConfigInput';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}
  @Query(() => AdminConfigReturn)
  async getAdminConfig(@Args('input') input: GetAdminConfigInputParams) {
    // return this.jobsService.pagination(input);
    return this.adminService.getAdminConfig(input);
  }

  @Mutation(() => AdminConfigReturn)
  async updateAdminConfig(@Args('input') input: SetAdminConfigInputParams) {
    return this.adminService.setAdminConfig(input);
  }
}
