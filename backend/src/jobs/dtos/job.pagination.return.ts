import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { JobReturn } from './job.return';

@ObjectType()
export class JobPaginationReturn {
  @Field(() => [JobReturn])
  job: JobReturn[];
  @Field(() => Int)
  jobCount: number;
}
