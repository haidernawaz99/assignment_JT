import { Field, Int, InputType, ID } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../interfaces/job.fileupload';

@InputType()
export class JobCreateInput {
  //   @Field(() => ID)
  //   readonly name: string;

  @Field()
  company: string;
  @Field()
  position: string;
  @Field()
  location: string;
  @Field()
  jobDescription: string;
  @Field()
  howToApply: string;
  @Field()
  public: boolean;
  @Field()
  email: string;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  logo: string;
  @Field()
  type: string;
  @Field()
  category: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image: Promise<FileUpload>;
}
