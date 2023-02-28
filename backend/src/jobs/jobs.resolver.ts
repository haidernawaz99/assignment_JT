import { Mutation, Query, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { JobReturn } from './interfaces/job.return';
import { JobCreateInput } from './interfaces/job.createInput';
import { GetJobInputParams } from './interfaces/jobs.getJobParams';
import { JobPaginationReturn } from './interfaces/job.pagination.return';

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
    @Args('input', { nullable: true }) input: GetJobInputParams,
  ) {
    // return this.jobsService.pagination(input);
    return this.jobsService.pagination(input);
  }

  @Mutation(() => JobReturn)
  async createJob(@Args('input') input: JobCreateInput) {
    return this.jobsService.create(input);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
