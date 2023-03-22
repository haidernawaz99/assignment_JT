import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export class SetCategoriesInputParams {
  @Field(() => [graphqlTypeJson])
  categories: [object];
}
