import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobExtendInput {
  //   @Field(() => ID)
  //   readonly name: string;

  @Field()
  editToken: string;
}
