import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class JobReturn {
  @Field(() => ID)
  id: string;
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
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field({ nullable: true })
  editToken: string;
  @Field()
  expiresAt: Date;
}
