import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class CatReturn {
  @Field(() => ID)
  id: string;
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly breed: string;
}
