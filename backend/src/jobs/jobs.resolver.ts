import { Mutation, Query, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { JobReturn } from './interfaces/job.return';
import { JobCreateInput } from './interfaces/job.createInput';
import { GetJobPaginationInputParams } from './interfaces/job.getJobInputPagination';
import { JobPaginationReturn } from './interfaces/job.pagination.return';
import { GetJobInputParams } from './interfaces/job.getJobInput';
import { JobUpdateInput } from './interfaces/job.updateInput';
import { JobExtendInput } from './interfaces/job.extendInput';
import { AdminConfigReturn } from './interfaces/admin.configuation.return';
import { GetAdminConfigInputParams } from './interfaces/admin.getAdminConfigInput';
import { SetAdminConfigInputParams } from './interfaces/admin.setAdminConfigInput';

import { DeleteJobInputParams } from './interfaces/admin.deleteJobInput';
import { GetJobPaginationAdminInputParams } from './interfaces/admin.getJobInputPagination';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class JobsResolver {
  constructor(
    //   private authorsService: AuthorsService,
    //   private postsService: PostsService,
    private readonly jobsService: JobsService,
  ) {}

  //   @Query((returns) => Author)
  //   async author(@Args('id', { type: () => Int }) id: number) {
  //     return this.authorsService.findOneById(id);
  //   }

  @Query(() => String)
  async hello123() {
    return 'Hello World!';
  }

  @Query(() => [JobReturn])
  async jobs(@Args('input', { nullable: true }) input: GetJobInputParams) {
    return this.jobsService.find(input);
  }

  @Query(() => JobPaginationReturn)
  async getJobByPagination(
    @Args('input', { nullable: true }) input: GetJobPaginationInputParams,
  ) {
    // return this.jobsService.pagination(input);
    return this.jobsService.pagination(input);
  }

  @Mutation(() => JobReturn)
  async createJob(@Args('input') input: JobCreateInput) {
    return this.jobsService.create(input);
  }

  @Mutation(() => JobReturn)
  async editJob(@Args('input') input: JobUpdateInput) {
    return this.jobsService.update(input);
  }

  @Mutation(() => JobReturn)
  async extendExpiresAt(@Args('input') input: JobExtendInput) {
    return this.jobsService.extendExpiresAt(input);
  }

  @Query(() => AdminConfigReturn)
  async getAdminConfig(@Args('input') input: GetAdminConfigInputParams) {
    // return this.jobsService.pagination(input);
    return this.jobsService.getAdminConfig(input);
  }

  @Mutation(() => AdminConfigReturn)
  async updateAdminConfig(@Args('input') input: SetAdminConfigInputParams) {
    return this.jobsService.setAdminConfig(input);
  }

  @Mutation(() => JobReturn)
  async deleteJob(@Args('input') input: DeleteJobInputParams) {
    return this.jobsService.deleteJob(input);
  }

  @UseGuards(JwtAuthGuard) // <-- Checks if the token passed is valid, and if so, returns the user object and a **NEW** token.
  @Query(() => JobPaginationReturn)
  async getJobByPaginationAdmin(
    @Args('input', { nullable: true }) input: GetJobPaginationAdminInputParams,
  ) {
    // return this.jobsService.pagination(input);
    return this.jobsService.paginationAdmin(input);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
