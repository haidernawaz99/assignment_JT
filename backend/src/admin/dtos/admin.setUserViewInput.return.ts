import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

@InputType()
export class SetUserViewInputParams {
  @Field(() => String)
  extensionPeriod: string;
  @Field(() => String)
  limit: string;
  @Field(() => String)
  order: string;
  @Field(() => String)
  sort: string;
}
