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
import { CreateAffiliateInputParams } from './interfaces/affiliate.getCreateAffiliateInput';
import { CreateAffiliateReturn } from './interfaces/affiliate.createAffiliate.return';
import { AdminAffiliateReturn } from './interfaces/affiliate.adminAffiliates.return';
import { GetAllAffiliatesInputParams } from './interfaces/affiliate.getAllAffiliatesInput';
import { ApproveAffiliatesInputParams } from './interfaces/affiliate.approveAffiliatesInput';
import { GetJobAffiliatesInputParams } from './interfaces/affiliate.getJobsInput';
import { AffiliateJobReturn } from './interfaces/affiliate.getJobsAffiliate.return';

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

  @Mutation(() => CreateAffiliateReturn)
  async createAffiliate(@Args('input') input: CreateAffiliateInputParams) {
    console.log('Create Affiliate: ', input);
    return this.jobsService.createAffiliate(input);
  }

  @Query(() => [AdminAffiliateReturn])
  async getAllAffiliates(@Args('input') input: GetAllAffiliatesInputParams) {
    return this.jobsService.getAllAffiliates(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async approveAffiliate(@Args('input') input: ApproveAffiliatesInputParams) {
    console.log('Manage Affiliate: ', input);
    return this.jobsService.approveAffiliate(input);
  }

  @Query(() => [AffiliateJobReturn])
  async getJobsAffiliate(
    @Args('input', { nullable: true }) input: GetJobAffiliatesInputParams,
  ) {
    return this.jobsService.getJobsAffiliate(input);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
