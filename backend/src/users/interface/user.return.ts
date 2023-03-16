import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserReturn {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Boolean)
  isAdmin?: boolean;

  @Field()
  accessToken: string;
}
