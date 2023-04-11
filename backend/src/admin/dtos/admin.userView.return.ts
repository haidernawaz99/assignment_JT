import {
  ObjectType,
  Field,
  ID,
  Int,
  Float,
  createUnionType,
} from '@nestjs/graphql';

@ObjectType()
export class AdminUserViewReturn {
  @Field()
  key: string;
  @Field()
  value: string;
}
