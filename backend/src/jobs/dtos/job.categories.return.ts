import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export class JobCategoriesReturn {
  @Field(() => [graphqlTypeJson])
  categories: [object];
}
