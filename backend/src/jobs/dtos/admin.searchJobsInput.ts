import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';

enum AllowedCategories {
  Design = 'Design',
  Development = 'Development',
  Product = 'Product',
  Other = 'Other',
}

registerEnumType(AllowedCategories, {
  name: 'AllowedCategories',
});

@InputType()
export class SearchJobAdminInputParams {
  //   @Field(() => [AllowedCategories], { nullable: true })
  //   categories: [AllowedCategories];

  @Field(() => [String], { nullable: true })
  categories: [string];

  @Field(() => String, { nullable: true })
  location: string;
  @Field(() => String, { nullable: true })
  position: string;
  @Field(() => String, { nullable: true })
  company: string;

  @Field(() => Int, { nullable: true })
  limit: number;
  @Field(() => Int, { nullable: true })
  skip: number;
}
