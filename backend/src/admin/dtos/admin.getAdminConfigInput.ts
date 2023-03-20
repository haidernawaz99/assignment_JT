import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class GetAdminConfigInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
}
