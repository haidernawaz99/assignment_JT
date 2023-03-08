import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class GetAllAffiliatesInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
}
