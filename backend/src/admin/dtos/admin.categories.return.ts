import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export class AdminCategoriesReturn {
  @Field(() => [graphqlTypeJson])
  categories: [object];
}
