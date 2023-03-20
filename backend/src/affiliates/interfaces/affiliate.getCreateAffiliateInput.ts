import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class CreateAffiliateInputParams {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  siteURL: string;
}
