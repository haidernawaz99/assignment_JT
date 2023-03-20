import { Field, Int, InputType, ID, registerEnumType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../interfaces/job.fileupload';

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
export class GetJobPaginationInputParams {
  @Field((type) => String, { nullable: true })
  category: AllowedCategories;
  @Field(() => Int, { nullable: true })
  limit: number;
  @Field(() => Int, { nullable: true })
  skip: number;
}
