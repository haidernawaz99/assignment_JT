import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class DeleteJobInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
  @Field(() => ID)
  id: string;
}
