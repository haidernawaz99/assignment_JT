import { Field, Int, InputType, ID } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../interfaces/job.fileupload';

@InputType()
export class JobUpdateInput {
  //   @Field(() => ID)
  //   readonly name: string;

  @Field({ nullable: true })
  company: string;
  @Field()
  editToken: string;
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  location: string;
  @Field({ nullable: true })
  jobDescription: string;
  @Field({ nullable: true })
  howToApply: string;
  @Field({ nullable: true })
  public: boolean;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  logo: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  category: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image: Promise<FileUpload>;
}
