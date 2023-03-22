import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class GetExpirationInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
}
