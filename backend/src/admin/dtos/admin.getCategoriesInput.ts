import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class GetCategoriesInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
}
