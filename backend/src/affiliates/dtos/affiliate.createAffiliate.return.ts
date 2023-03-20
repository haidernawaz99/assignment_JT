import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { JobReturn } from '../../jobs/dtos/job.return';

@ObjectType()
export class CreateAffiliateReturn {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  siteURL: string;
}
