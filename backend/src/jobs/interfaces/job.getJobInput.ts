import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from './job.fileupload';

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
export class GetJobInputParams {
  @Field(() => [AllowedCategories], { nullable: true })
  categories: [AllowedCategories];

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
