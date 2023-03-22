import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class AdminExpirationReturn {
  @Field(() => Float)
  days: number;
}
