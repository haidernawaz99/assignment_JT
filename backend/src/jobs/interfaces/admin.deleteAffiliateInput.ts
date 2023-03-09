import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class DeleteAffiliatesInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
  @Field(() => ID)
  id: string;
}
