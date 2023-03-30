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
export class GetAllJobsAdminInputParams {
  @Field(() => String, { nullable: true })
  authToken: string;
}
