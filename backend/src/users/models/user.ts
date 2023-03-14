import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Boolean)
  isAdmin?: boolean;
}
