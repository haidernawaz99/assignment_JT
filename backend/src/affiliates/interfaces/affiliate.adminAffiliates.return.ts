import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminAffiliateReturn {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  siteURL: string;
  @Field()
  affiliateToken: string;
  @Field()
  status: string;
  @Field()
  createdAt: Date;
}
