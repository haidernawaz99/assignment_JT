import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class AdminConfigReturn {
  @Field(() => Float)
  days: number;
}
