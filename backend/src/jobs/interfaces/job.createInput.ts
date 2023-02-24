import { Field, Int, InputType, ID } from '@nestjs/graphql';

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
}
