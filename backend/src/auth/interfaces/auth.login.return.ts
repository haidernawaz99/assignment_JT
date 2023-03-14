import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class AuthLoginReturn {
  @Field()
  accessToken: string;
}
