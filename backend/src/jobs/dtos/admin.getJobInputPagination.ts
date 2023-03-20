import { Field, Int, InputType, registerEnumType } from '@nestjs/graphql';

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
export class GetJobPaginationAdminInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
  @Field(() => Int, { nullable: true })
  limit: number;
  @Field(() => Int, { nullable: true })
  skip: number;
}
