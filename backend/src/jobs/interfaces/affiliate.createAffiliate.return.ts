import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { JobReturn } from './job.return';

@ObjectType()
export class CreateAffiliateReturn {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  siteURL: string;
}
