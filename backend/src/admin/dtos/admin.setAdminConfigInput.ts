import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class SetAdminConfigInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
  @Field(() => Int, { nullable: true })
  days: number;
}
