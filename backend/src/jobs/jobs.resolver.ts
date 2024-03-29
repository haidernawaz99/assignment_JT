import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { JobReturn } from './dtos/job.return';
import { JobCreateInput } from './dtos/job.createInput';

import { JobPaginationReturn } from './dtos/job.pagination.return';
import { GetJobInputParams } from './dtos/job.getJobInput';
import { JobUpdateInput } from './dtos/job.updateInput';
import { JobExtendInput } from './dtos/job.extendInput';
import { DeleteJobInputParams } from './dtos/job.deleteJobInput';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { JobCategoriesReturn } from 'src/jobs/dtos/job.categories.return';
import { GetAllJobsAdminInputParams } from './dtos/admin.getAllJobInput';
import { GetJobPaginationInputParams } from './dtos/job.getJobInputPagination';
import { SearchJobAdminInputParams } from './dtos/admin.searchJobsInput';
import { CurrentRequest } from './decorators/current-request.decorator';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobReturn])
  async jobs(@Args('input', { nullable: true }) input: GetJobInputParams) {
    return this.jobsService.find(input);
  }

  @Query(() => JobReturn, { nullable: true })
  async uniqueEmail(
    @Args('input', { nullable: true }) input: GetJobInputParams,
  ) {
    return this.jobsService.unqiueEmail(input);
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
  async editJob(
    @Args('input') input: JobUpdateInput,
    @CurrentRequest() request,
  ) {
    return this.jobsService.update(input, request);
  }

  @Mutation(() => JobReturn)
  async extendExpiresAt(@Args('input') input: JobExtendInput) {
    return this.jobsService.extendExpiresAt(input);
  }

  @UseGuards(JwtAuthGuard) // <-- Checks if the token passed is valid, and if so, returns the user object and a **NEW** token.
  @Mutation(() => JobReturn)
  async deleteJob(@Args('input') input: DeleteJobInputParams) {
    return this.jobsService.deleteJob(input);
  }

  @UseGuards(JwtAuthGuard) // <-- Checks if the token passed is valid, and if so, returns the user object and a **NEW** token.
  @Query(() => [JobReturn])
  async getAllJobsAdmin() {
    // return this.jobsService.pagination(input);
    return this.jobsService.jobsAdmin();
  }

  @Query(() => JobCategoriesReturn)
  async getCategories() {
    return { categories: this.jobsService.getCategories() }; // <-- How the frontend expects the input, in a categories object.
  }

  @UseGuards(JwtAuthGuard) // <-- Checks if the token passed is valid, and if so, returns the user object and a **NEW** token.
  @Query(() => [JobReturn])
  async searchJobAdmin(@Args('input') input: SearchJobAdminInputParams) {
    return this.jobsService.searchJobsAdmin(input);
  }
}
