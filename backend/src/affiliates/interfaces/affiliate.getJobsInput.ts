import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class GetJobAffiliatesInputParams {
  @Field(() => String)
  affiliateToken: string;
  @Field(() => Int, { nullable: true })
  limit: number;
  @Field(() => [String], { nullable: true })
  categories: [string];
}
